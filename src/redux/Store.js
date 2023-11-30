import { configureStore } from "@reduxjs/toolkit";
import GameReducer from './slices/GameSlice'
import OnlineReducer from "./slices/OnlineSlice";

export const Store = configureStore({
    reducer : {
        sameScreen: GameReducer,
        online: OnlineReducer
    }
})