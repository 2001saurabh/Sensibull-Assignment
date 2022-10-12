import { configureStore } from "@reduxjs/toolkit";
// import quoteReducer from "../features/quotes/quoteSlice";

import StockReducer from "../features/stocks/stockSlice";
const store = configureStore({
  reducer: {
    stock: StockReducer,
    // quote: quoteReducer,
    // user: userReducer,
  },
});
export default store;
