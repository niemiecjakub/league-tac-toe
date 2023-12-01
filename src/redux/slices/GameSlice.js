import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WNNING_CONDITIONS, CHAMPION_API_URL } from '../../constants';
import {db} from '../../firebase-config'
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import axios from 'axios';

const compareArrays = (a, b) => {
    return a.length === b.length && a.every((element, index) => element === b[index]);
}

const initialState = {
    roomId: "",
    isGameOver : false,
    isLoadingGame : true,
    playersJoined: [],
    player1: {
        name: "Player 1",
        alias: "P 1",
        fields: [],
        steals:3,
        score: 0
    },
    player2 : {
        name: "Player 2",
        alias: "P 2",
        fields: [],
        steals:3,
        score: 0
    },
    currentPlayer: {
        name: "Player 1",
        alias: "P 1",
        fields: [],
        steals:3,
        score: 0
    },
    gameFields: [],
    possibleFields: [1,2,3,4,5,6,7,8],
    categoryFields: {
        horizontal: [],
        vertical: []
    }
}

export const getNewGameData = createAsyncThunk(
  'game/getNewGameData',
  async (param, thunkAPI) => {
    const {data: {data : {horizontal, vertical}, list}} = await axios(`${CHAMPION_API_URL}game-start`);
  
    const listOfPromises = Promise.all(list.map(async (combinedCategories) => {
      const [category, othercategory] = combinedCategories
      const {data: {champions}} = await axios(`${CHAMPION_API_URL}champion/${category.category}/${category.name}/${othercategory.category}/${othercategory.name}`);
      return  champions
    }))
    const possibleFieldsArray = await listOfPromises
    const possibleFields = {}
        possibleFieldsArray.forEach((champions, index) => {
        possibleFields[`${index+1}`] = champions
    })
    const gameFields = {}
        list.forEach((combinedCategory, index) => {
        gameFields[`${index+1}`] = combinedCategory
    })
    return {
        possibleFields,
        horizontal, 
        vertical, 
        gameFields
    }
  }
)

export const startOnlineGame = createAsyncThunk(
    'online/startOnlineGame',
    async (roomId, {getState}) => {
      const {data: {data : {horizontal, vertical}, list}} = await axios(`${CHAMPION_API_URL}game-start`);
      const listOfPromises = Promise.all(list.map(async (combinedCategories) => {
        const [category, othercategory] = combinedCategories
        const {data: {champions}} = await axios(`${CHAMPION_API_URL}champion/${category.category}/${category.name}/${othercategory.category}/${othercategory.name}`);
        return  champions
      }))

      const possibleFieldsArray = await listOfPromises


      const possibleFields = {}
      possibleFieldsArray.forEach((champions, index) => {
        possibleFields[`${index+1}`] = champions
      })

      const gameFields = {}
      list.forEach((combinedCategory, index) => {
        gameFields[`${index+1}`] = combinedCategory
      })
      const docRef = doc(db, "rooms", roomId)

      await setDoc(docRef, {
        categoryFields: {
          horizontal: horizontal,
          vertical: vertical
        },
        possibleFields: possibleFields,
        gameFields: gameFields,
        isGameStarted: true,
        isLoadingGame: false
        }, {merge : true})
      }
)

export const skipTurnOnline = createAsyncThunk(
    'online/skipTurnOnline',
    async (params, {getState}) => {
  
        const state = getState()
        const docRef = doc(db, "rooms", state.game.roomId)
        const docSnap = await getDoc(docRef);
        const {currentPlayer, player1, player2} = docSnap.data()
        
        const nextPlayer = currentPlayer.name === "Player 1" ? player2 : player1
        await setDoc(docRef, {
            currentPlayer: nextPlayer
        }, {merge : true})
      }
  )

const GameSlice = createSlice({
    name: "Game",
    initialState,
    reducers: {
        setRoomId : (state, action) => {
            state.roomId = action.payload
        },
        setGameMode : (state, action) => {
            state.gameMode = action.payload
        },
        setCurrentPlayer : (state, action) => {
            const nextPlayer = state.currentPlayer.name === "Player 1" ? state.player2 : state.player1
            state.currentPlayer = nextPlayer
        },
        setPlayerField : (state, action) => {
            const id = action.payload
            const currentPlayer = state.currentPlayer.name === "Player 1" ? state.player1 : state.player2
            const otherPlayer = state.currentPlayer.name === "Player 1" ? state.player2 : state.player1
            const index = otherPlayer.fields.indexOf(id)
            if (index > -1) { 
                otherPlayer.fields.splice(index, 1);
                currentPlayer.steals -= 1;
            }
            currentPlayer.fields.push(id)
        },
        checkWin: (state, action) => {
            const player = state.currentPlayer.name === "Player 1" ? state.player1 : state.player2
            const playerFieldsSorted = player.fields.toSorted();

            WNNING_CONDITIONS.forEach(winningCondition => {
                if (compareArrays(winningCondition, playerFieldsSorted)) {
                    const otherPlayer = state.currentPlayer.name === "Player 1" ? state.player2 : state.player1

                    player.score += 1;
                    player.fields = []
                    player.steals = 3

                    otherPlayer.fields = []
                    otherPlayer.steals = 3

                    state.isGameOver = true
                }
            })
        },
        endAsDraw: (state, action) => {
            state.player1 = {
                ...initialState.player1,
                score: state.player1.score + 1
            }
            state.player2 = {
                ...initialState.player2,
                score: state.player2.score + 1
            }
            state.currentPlayer = initialState.currentPlayer
        },
        setDBstate: (state, action) => {
            for (const [key, value] of Object.entries(action.payload)) {
              if (key === "roomId") continue
              state[`${key}`] =  value
            }
        }  
    }, 
    extraReducers: (builder) => {
      builder.addCase(getNewGameData.pending, (state) => {
        state.isLoadingGame = true
      })
      builder.addCase(getNewGameData.fulfilled, (state, action) => {
        state.isLoadingGame = false
        state.isGameOver = false

        const {possibleFields,horizontal, vertical, gameFields} = action.payload
        state.possibleFields = possibleFields
        state.gameFields = gameFields
        state.categoryFields.vertical = vertical
        state.categoryFields.horizontal = horizontal
        
      })
      builder.addCase(getNewGameData.rejected, (state, action) => {
        state.isLoadingGame = false
        state.error = action.error.message
      })
      builder.addCase(startOnlineGame.pending, (state) => {
        state.isLoadingGame = true
      })
      builder.addCase(startOnlineGame.fulfilled, (state, action) => {
        state.isLoadingGame = false
      })
      builder.addCase(startOnlineGame.rejected, (state, action) => {
      })
    },                                                                                                      
}) 
                                    
export const {
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
    setDBstate } = GameSlice.actions

export default GameSlice.reducer