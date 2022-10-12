import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  quote: [],
  error: "",
};

export const fetchQuote = createAsyncThunk("quote/fetchQuote", () => {
  return axios
    .get(`https://prototype.sbulltech.com/api/v2/quotes/SBIN`)
    .then((res) => console.log(res));
});

const quoteSlice = createSlice(stocks,{
  name: 'quote',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchQuote.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchQuote.fulfilled, (state, action) => {
      state.loading = false;
      state.quote = action.payload;
      state.error = "";
    });
    builder.addCase(fetchQuote.rejected, (state, action) => {
      state.loading = false;
      state.quote = [];
      state.error = action.error.message;
    });
  },
});

export default quoteSlice.reducer;
