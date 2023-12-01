import { configureStore } from "@reduxjs/toolkit";
import GameReducer from './slices/GameSlice'

export const Store = configureStore({
    reducer : {
        game: GameReducer,
    }
})