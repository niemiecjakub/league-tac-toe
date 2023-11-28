import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WNNING_CONDITIONS, CHAMPION_API_URL } from '../../constants';
import axios from 'axios';


const compareArrays = (a, b) => {
    return a.length === b.length && a.every((element, index) => element === b[index]);
}

const initialState = {
    gameMode : 'Same screen',
    isGameOver : false,
    isLoadingGame : true,
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
    possibleFields: new Array(8),
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

    const possibleFields = await listOfPromises
    return {
      possibleFields,
      horizontal, 
      vertical, 
      list}
  }
)


const GameSlice = createSlice({
    name: "Game",
    initialState,
    reducers: {
        setCurrentPlayer : (state, action) => {
            const nextPlayer = state.currentPlayer.name === "Player 1" ? state.player2 : state.player1
            state.currentPlayer = nextPlayer
        },
        setGameMode : (state, action) => {
            state.gameMode = action.payload
        },
        setHorizontalFields : (state, action) => {
            state.categoryFields.horizontal = action.payload
        },
        setVerticalFields : (state, action) => {
            state.categoryFields.vertical = action.payload
        },
        setGameFields : (state, action) => {
            state.gameFields = action.payload
        },
        setPossibleFields : (state, action) => {
            const {champions, fieldId} = action.payload
            state.possibleFields[fieldId] = champions
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
        }
    }, 
    extraReducers: (builder) => {
      builder.addCase(getNewGameData.pending, (state) => {
        state.isLoadingGame = true
      })
      builder.addCase(getNewGameData.fulfilled, (state, action) => {
        state.isLoadingGame = false
        state.isGameOver = false

        const {possibleFields,horizontal, vertical, list} = action.payload
        state.possibleFields = possibleFields
        state.gameFields = list
        state.categoryFields.vertical = vertical
        state.categoryFields.horizontal = horizontal
      })
      builder.addCase(getNewGameData.rejected, (state, action) => {
        state.isLoadingGame = false
        state.error = action.error.message
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
    endAsDraw } = GameSlice.actions

export default GameSlice.reducer