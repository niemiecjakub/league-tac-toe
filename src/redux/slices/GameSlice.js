import { createSlice } from "@reduxjs/toolkit";
import { WNNING_CONDITIONS } from '../../constants';
const compareArrays = (a, b) => {
    return a.length === b.length && a.every((element, index) => element === b[index]);
}

const initialState = {
    gameMode : 'Same screen',
    player1: {
        name: "Player 1",
        fields: [],
        steals:3,
        score: 0
    },
    player2 : {
        name: "Player 2",
        fields: [],
        steals:3,
        score: 0
    },
    currentPlayer: {
        name: "Player 1"
    },
    gameFields: [],
    possibleFields: new Array(8),
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
            const {fieldId} = action.payload
            const currentPlayer = state.currentPlayer.name === "Player 1" ? state.player1 : state.player2
            const otherPlayer = state.currentPlayer.name === "Player 1" ? state.player2 : state.player1
            const index = otherPlayer.fields.indexOf(fieldId)
            if (index > -1) { 
                otherPlayer.fields.splice(index, 1);
                currentPlayer.steals -= 1;
            }
            currentPlayer.fields.push(fieldId)
        },
        checkWin: (state, action) => {
            const player = state.currentPlayer.name === "Player 1" ? state.player1 : state.player2
            const playerFieldsSorted = player.fields.toSorted();

            WNNING_CONDITIONS.forEach(winningCondition => {
                if (compareArrays(winningCondition, playerFieldsSorted)) {
                    player.score += 1
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
    }
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