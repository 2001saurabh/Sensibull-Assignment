import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "./comoponents/Loader";
const QuotesTable = lazy(() => import("./api/features/quotes/QuotesTable"));
const StockPage = lazy(() => import("./comoponents/StockPage"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<StockPage />} />
          <Route path="/quote/:symbol" element={<QuotesTable />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
