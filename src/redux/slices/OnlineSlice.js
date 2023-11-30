import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WNNING_CONDITIONS, CHAMPION_API_URL } from '../../constants';
import { collection, getDoc, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from "../../firebase-config";
import axios from 'axios';;

const initialState = {
  roomId: "",
  isGameStarted: false,
  playersJoined : [],
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
  }
}

export const startOnlineGame = createAsyncThunk(
    'online/startOnlineGame',
    async (param, {getState}) => {
      const {data: {data : {horizontal, vertical}, list}} = await axios(`${CHAMPION_API_URL}game-start`);
      const listOfPromises = Promise.all(list.map(async (combinedCategories) => {
        const [category, othercategory] = combinedCategories
        const {data: {champions}} = await axios(`${CHAMPION_API_URL}champion/${category.category}/${category.name}/${othercategory.category}/${othercategory.name}`);
        return  champions
      }))

      const possibleFieldsArray = await listOfPromises

      const possibleFields = {}
      possibleFieldsArray.forEach((champions, index) => {
        possibleFields[`${index + 1}`] = champions
      })

      const gameFields = {}
      list.forEach((combinedCategory, index) => {
        gameFields[`${index + 1}`] = combinedCategory
      })

      const horizontalFields = {}
      horizontal.forEach((category, index) => {
        horizontalFields[`${index + 1}`] = category
      })

      const verticalFields = {}
      vertical.forEach((category, index) => {
        verticalFields[`${index + 1}`] = category
      })

      const state = getState()
      console.log(state.online.roomId)
      const docRef = doc(db, "rooms", state.online.roomId)

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



const OnlineSlice = createSlice({
    name: "Online",
    initialState,
    reducers: {
        setRoomId : (state, action) => {
            state.roomId = action.payload
        },
        setDBstate: (state, action) => {
          for (const [key, value] of Object.entries(action.payload)) {
            if (key === "roomId") continue
            state[`${key}`] =  value
          }
        }

    }, 
    extraReducers: (builder) => {
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
    setRoomId,
    setDBstate
    } = OnlineSlice.actions

export default OnlineSlice.reducer