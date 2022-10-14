import React from "react";
import Layout from "./layout";
import StockTable from "../api/features/stocks/StocksTable";

const StockPage = () => {
  return (
    <div>
      <Layout />
      <StockTable />
    </div>
  );
};

export default StockPage;
