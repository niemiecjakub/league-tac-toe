import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPlayer: 'Player 1',
    gameMode : 'Same screen',
    championNamesList: [],
    player1: {
        fields: [],
        score: 0
    },
    player2 : {
        fields: [],
        score: 0
    },
    gameFields: [],
    categoryFields: {
        horizontal: [],
        vertical: []
    }
}

const GameSlice = createSlice({
    name: "Game",
    initialState,
    reducers: {
        setCurrentPlayer : (state, action) => {
            const nextPlayer = state.currentPlayer === "Player 1" ? "Player 2" : "Player 1"
            state.currentPlayer = nextPlayer
        },
        setGameMode : (state, action) => {
            state.gameMode = action.payload
        },
        setChampionNamesList : (state, action) => {
            state.championNamesList = action.payload
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
        setPlayerField : (state, action) => {
            const {player, fieldId} = action.payload
            if (player === "Player 1") {
                state.player1.fields.push(fieldId)
            } else {
                state.player2.fields.push(fieldId)
            }
        }
    }
})

export const {setCurrentPlayer, setGameMode, setChampionNamesList, setHorizontalFields, setVerticalFields, setGameFields, setPlayerField } = GameSlice.actions

export default GameSlice.reducer