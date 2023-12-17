import { createSlice } from "@reduxjs/toolkit";
import { QUERY_INITIAL_STATE } from "../../utility/constants";

const QuerySlice = createSlice({
  name: "Query",
  initialState: QUERY_INITIAL_STATE,
  reducers: {
    addQuery: (state, action) => {
      const maxId = state.queries.reduce(
        (max, obj) => (obj.id > max ? obj.id : max),
        0
      );

      state.queries.push({
        id: maxId + 1,
        categoryType: "all",
        categoryName: "all",
      });
    },
    removeQuery: (state, action) => {
      const queryId = action.payload;
      const index = state.queries.findIndex((query) => query.id === queryId);
      state.queries.splice(index, 1);
    },
    updateQuery: (state, action) => {
      const { id, field, value } = action.payload;
      const index = state.queries.findIndex((query) => query.id === id);

      if (index !== -1) {
        if (field === "categoryType") {
          state.queries[index] = {
            ...state.queries[index],
            categoryType: value,
            categoryName: "all",
          };
        } else {
          state.queries[index] = {
            ...state.queries[index],
            categoryName: value,
          };
        }
      }
    },
    setChampions: (state, action) => {
      state.champions = action.payload;
    },
    resetQuery: (state, action) => {
      return QUERY_INITIAL_STATE;
    },
  },
});

export const { addQuery, removeQuery, updateQuery, setChampions, resetQuery } =
  QuerySlice.actions;

export default QuerySlice.reducer;
