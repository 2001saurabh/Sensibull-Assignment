import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stocks: [],
  keys: [],
  searchResults: [],
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    getStocks: (state, action) => {
      state.stocks = action.payload;
    },
    getKeys: (state, action) => {
      state.keys = action.payload;
    },
    getSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export default stockSlice.reducer;
export const { getStocks, getKeys, getSearchResults } = stockSlice.actions;
