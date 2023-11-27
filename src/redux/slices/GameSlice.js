import { createSlice, current } from "@reduxjs/toolkit";

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

const compareArrays = (a, b) => {
    return a.length === b.length && a.every((element, index) => element === b[index]);
}

const initialState = {
    gameMode : 'Same screen',
    championNamesList: [],
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
            const playerFields = state.currentPlayer.name == "Player 1" ? state.player1 : state.player2
            const playerFieldsSorted = playerFields.fields.toSorted();

            winningConditions.forEach(winningCondition => {
                if (compareArrays(winningCondition, playerFieldsSorted)) {
                    console.log("win")
                }
            })

        }
    }
}) 

export const {setCurrentPlayer, setGameMode, setChampionNamesList, setHorizontalFields, setVerticalFields, setGameFields, setPlayerField, checkWin } = GameSlice.actions

export default GameSlice.reducer