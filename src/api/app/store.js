import { configureStore } from "@reduxjs/toolkit";

import StockReducer from "../features/stocks/stockSlice";
const store = configureStore({
  reducer: {
    stock: StockReducer,
  },
});
export default store;
