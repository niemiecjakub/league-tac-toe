import { configureStore } from "@reduxjs/toolkit";
import GameReducer from "./slices/GameSlice";
import QueryReducer from "./slices/QuerySlice";

export const Store = configureStore({
  reducer: {
    game: GameReducer,
    query: QueryReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: {
    trace: true,
  },
});
