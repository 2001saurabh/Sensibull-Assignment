import Layout from "./comoponents/layout";
import React, { lazy, Suspense } from "react";
// import StockTable from "./api/features/stocks/StocksTable";
import { ColorRing } from "react-loader-spinner";

const StockTable = lazy(() => import("./api/features/stocks/StocksTable"));
function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>loading....</div>}>
        <Layout />
        {/* <Suspense
        fallback={
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#429EA6"]}
          />
        }
      > */}
        <StockTable />
      </Suspense>
    </div>
  );
}

export default App;
