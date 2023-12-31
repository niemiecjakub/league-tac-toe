import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  WNNING_CONDITIONS,
  CHAMPION_API_URL,
  GAME_INITIAL_STATE,
} from "../../utility/constants";
import { db } from "../../firebase-config";
import {
  doc,
  getDoc,
  setDoc,
  arrayRemove,
  arrayUnion,
  increment,
  deleteDoc,
} from "firebase/firestore";
import axios from "axios";
import Cookies from "js-cookie";

export const COMPARE_ARRAYS = (a, b) => {
  return (
    a.length === b.length && a.every((element, index) => element === b[index])
  );
};

//GET DATA FOR SAME-SCREEN GAME
export const getNewGameData = createAsyncThunk(
  "game/getNewGameData",
  async (param, thunkAPI) => {
    const {
      data: {
        data: { horizontal, vertical },
        list,
      },
    } = await axios(`${CHAMPION_API_URL}game-start`);

    const listOfPromises = Promise.all(
      list.map(async (combinedCategories) => {
        const [category, othercategory] = combinedCategories;
        const {
          data: { champions },
        } = await axios(
          `${CHAMPION_API_URL}champion/${category.category}/${category.name}/${othercategory.category}/${othercategory.name}`
        );
        return champions;
      })
    );
    const possibleFieldsArray = await listOfPromises;
    const possibleFields = {};
    possibleFieldsArray.forEach((champions, index) => {
      possibleFields[`${index + 1}`] = champions;
    });
    const gameFields = {};
    list.forEach((combinedCategory, index) => {
      gameFields[`${index + 1}`] = combinedCategory;
    });
    return {
      possibleFields,
      horizontal,
      vertical,
      gameFields,
    };
  }
);

//GET DATA AND START ONLINE GAME
export const startOnlineGame = createAsyncThunk(
  "online/startOnlineGame",
  async (roomId, { getState }) => {
    const {
      data: {
        data: { horizontal, vertical },
        list,
      },
    } = await axios(`${CHAMPION_API_URL}game-start`);
    const listOfPromises = Promise.all(
      list.map(async (combinedCategories) => {
        const [category, othercategory] = combinedCategories;
        const {
          data: { champions },
        } = await axios(
          `${CHAMPION_API_URL}champion/${category.category}/${category.name}/${othercategory.category}/${othercategory.name}`
        );
        return champions;
      })
    );

    const possibleFieldsArray = await listOfPromises;

    const possibleFields = {};
    possibleFieldsArray.forEach((champions, index) => {
      possibleFields[`${index + 1}`] = champions;
    });

    const gameFields = {};
    list.forEach((combinedCategory, index) => {
      gameFields[`${index + 1}`] = combinedCategory;
    });

    const docRef = doc(db, "rooms", roomId);

    await setDoc(
      docRef,
      {
        categoryFields: {
          horizontal: horizontal,
          vertical: vertical,
        },
        possibleFields: possibleFields,
        gameFields: gameFields,
        isGameStarted: true,
        isLoadingGame: false,
        isGameOver: false,
        fields: GAME_INITIAL_STATE.fields,
        player1: {
          fields: GAME_INITIAL_STATE.player1.fields,
          steals: GAME_INITIAL_STATE.player1.steals,
          requestDraw: GAME_INITIAL_STATE.player1.requestDraw,
          requestNewGame: GAME_INITIAL_STATE.player1.requestNewGame,
        },
        player2: {
          fields: GAME_INITIAL_STATE.player2.fields,
          steals: GAME_INITIAL_STATE.player2.steals,
          requestDraw: GAME_INITIAL_STATE.player2.requestDraw,
          requestNewGame: GAME_INITIAL_STATE.player2.requestNewGame,
        },
      },
      { merge: true }
    );
  }
);

//CHANGE CURRENT PLAYER
export const skipTurnOnline = createAsyncThunk(
  "online/skipTurnOnline",
  async (params, { getState }) => {
    const state = getState();
    const docRef = doc(db, "rooms", state.game.roomId);
    const docSnap = await getDoc(docRef);
    const { currentPlayer, player1, player2 } = docSnap.data();

    const nextPlayer = currentPlayer.name === "Player 1" ? player2 : player1;

    if (nextPlayer.requestDraw) {
      nextPlayer.requestDraw = false;
    }

    await setDoc(
      docRef,
      {
        currentPlayer: nextPlayer,
        [nextPlayer.key]: {
          ...nextPlayer,
          requestDraw: false,
        },
      },
      { merge: true }
    );
  }
);

//SET PLAYER FIELD
export const setPlayerFieldOnline = createAsyncThunk(
  "online/setPlayerFieldOnline",
  async ({ fieldId, name, key }, { getState }) => {
    const state = getState();
    const docRef = doc(db, "rooms", state.game.roomId);
    const docSnap = await getDoc(docRef);

    const { player1, player2 } = docSnap.data();
    const player = Cookies.get("player") === "Player 1" ? player1 : player2;
    const otherPlayer = player.name === "Player 1" ? player2 : player1;

    if (otherPlayer.fields.includes(fieldId)) {
      await setDoc(
        docRef,
        {
          [otherPlayer.key]: {
            fields: arrayRemove(fieldId),
          },
          [player.key]: {
            fields: arrayUnion(fieldId),
            steals: increment(-1),
          },
          fields: {
            [fieldId]: {
              key,
              name,
              player: player.key,
              history: arrayUnion(name),
            },
          },
        },
        { merge: true }
      );
    } else {
      await setDoc(
        docRef,
        {
          [player.key]: {
            fields: arrayUnion(fieldId),
          },
          fields: {
            [fieldId]: {
              key,
              name,
              player: player.key,
              history: arrayUnion(name),
            },
          },
        },
        { merge: true }
      );
    }
  }
);

export const checkWinOnline = createAsyncThunk(
  "online/checkWinOnline",
  async (params, { getState }) => {
    const state = getState();
    const docRef = doc(db, "rooms", state.game.roomId);
    const player =
      state.game.currentPlayer.name === "Player 1"
        ? state.game.player1
        : state.game.player2;
    const playerFieldsSorted = player.fields.toSorted();

    WNNING_CONDITIONS.forEach(async (winningCondition) => {
      if (COMPARE_ARRAYS(winningCondition, playerFieldsSorted)) {
        await setDoc(
          docRef,
          {
            winner: player.key,
            [player.key]: {
              score: increment(1),
            },
            isGameOver: true,
          },
          { merge: true }
        );
      }
    });
  }
);

export const requestDrawOnline = createAsyncThunk(
  "online/requestDrawOnline",
  async (params, { getState }) => {
    const state = getState();
    const docRef = doc(db, "rooms", state.game.roomId);
    const storedPlayer = Cookies.get("player");
    const player = storedPlayer === "Player 1" ? "player1" : "player2";

    await setDoc(
      docRef,
      {
        [player]: { requestDraw: true },
      },
      { merge: true }
    );
  }
);

export const requestPlayAgainOnline = createAsyncThunk(
  "online/requestPlayAgainOnline",
  async (params, { getState }) => {
    const state = getState();
    const docRef = doc(db, "rooms", state.game.roomId);
    const storedPlayer = Cookies.get("player");
    const player = storedPlayer === "Player 1" ? "player1" : "player2";

    await setDoc(
      docRef,
      {
        [player]: { requestNewGame: true },
      },
      { merge: true }
    );
  }
);

export const playAgainOnline = createAsyncThunk(
  "online/playAgainOnline",
  async (params, { getState }) => {
    const state = getState();
    const docRef = doc(db, "rooms", state.game.roomId);
    await setDoc(
      docRef,
      {
        fields: GAME_INITIAL_STATE.fields,
        isGameOver: false,
        isGameStarted: false,
      },
      { merge: true }
    );
  }
);

export const setFieldOnline = createAsyncThunk(
  "online/setFieldOnline",
  async (params, { getState }) => {
    const state = getState();
    const docRef = doc(db, "rooms", state.game.roomId);
    for (const [key, value] of Object.entries(params)) {
      await setDoc(
        docRef,
        {
          [`${key}`]: value,
        },
        { merge: true }
      );
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "online/deleteRoom",
  async (params, { getState }) => {
    const state = getState();
    const docRef = doc(db, "rooms", state.game.roomId);
    await deleteDoc(docRef);
  }
);

const GameSlice = createSlice({
  name: "Game",
  initialState: GAME_INITIAL_STATE,
  reducers: {
    clearState: (state, action) => {
      return GAME_INITIAL_STATE;
    },
    setGameOptions: (state, action) => {
      const { gameMode, stealsEnabled, roomId, turnTime } = action.payload;
      state.gameMode = gameMode;
      state.stealsEnabled = stealsEnabled;
      state.roomId = roomId;
      state.turnTime = turnTime;
    },
    setCurrentPlayer: (state, action) => {
      const nextPlayer =
        state.currentPlayer.name === "Player 1" ? state.player2 : state.player1;
      state.currentPlayer = nextPlayer;
    },
    setPlayerField: (state, action) => {
      const { name, fieldId, key } = action.payload;
      const player =
        state.currentPlayer.name === "Player 1" ? state.player1 : state.player2;
      const otherPlayer =
        state.currentPlayer.name === "Player 1" ? state.player2 : state.player1;
      const index = otherPlayer.fields.indexOf(fieldId);
      if (index > -1) {
        otherPlayer.fields.splice(index, 1);
        player.steals -= 1;
      }
      player.fields.push(fieldId);

      state.fields[fieldId] = {
        ...state.fields[fieldId],
        name,
        player: player.key,
        key,
      };
      state.fields[fieldId].history.push(name);
    },
    checkWin: (state, action) => {
      const player =
        state.currentPlayer.name === "Player 1" ? state.player1 : state.player2;
      const otherPlayer =
        state.currentPlayer.name === "Player 1" ? state.player2 : state.player1;

      const playerFieldsSorted = player.fields.toSorted();

      WNNING_CONDITIONS.forEach((winningCondition) => {
        if (COMPARE_ARRAYS(winningCondition, playerFieldsSorted)) {
          state.winner = player.name;

          player.score += 1;
          player.fields = GAME_INITIAL_STATE.player1.fields;
          player.steals = GAME_INITIAL_STATE.player1.steals;

          otherPlayer.fields = GAME_INITIAL_STATE.player1.fields;
          otherPlayer.steals = GAME_INITIAL_STATE.player1.steals;

          state.currentPlayer = GAME_INITIAL_STATE.currentPlayer;
          state.isGameOver = true;
        }
      });
    },
    endAsDraw: (state, action) => {
      state.player1 = {
        ...GAME_INITIAL_STATE.player1,
        score: state.player1.score + 1,
      };
      state.player2 = {
        ...GAME_INITIAL_STATE.player2,
        score: state.player2.score + 1,
      };
      state.currentPlayer = GAME_INITIAL_STATE.currentPlayer;
    },
    setDBstate: (state, action) => {
      if (action.payload !== undefined) {
        for (const [key, value] of Object.entries(action.payload)) {
          state[`${key}`] = value;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNewGameData.pending, (state) => {
      state.isLoadingGame = true;
    });
    builder.addCase(getNewGameData.fulfilled, (state, action) => {
      state.currentPlayer = GAME_INITIAL_STATE.currentPlayer;
      state.fields = GAME_INITIAL_STATE.fields;

      const { possibleFields, horizontal, vertical, gameFields } =
        action.payload;
      state.possibleFields = possibleFields;
      state.gameFields = gameFields;
      state.categoryFields.vertical = vertical;
      state.categoryFields.horizontal = horizontal;

      state.isLoadingGame = false;
      state.isGameOver = false;
    });
    builder.addCase(getNewGameData.rejected, (state, action) => {
      state.isLoadingGame = false;
      state.error = action.error.message;
    });
  },
});

export const {
  clearState,
  setCurrentPlayer,
  setGameMode,
  setHorizontalFields,
  setVerticalFields,
  setGameFields,
  setPossibleFields,
  setPlayerField,
  checkWin,
  setRoomId,
  endAsDraw,
  setDBstate,
  setGameOptions,
} = GameSlice.actions;

export default GameSlice.reducer;
