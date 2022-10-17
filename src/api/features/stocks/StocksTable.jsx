import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStocks, getKeys } from "./stockSlice";
import Papa from "papaparse";
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  styled,
  Paper,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import Spinner from "../../../comoponents/Loader";

const Wrapper = styled(Box)`
  margin-top: 20vh;
  max-width: 80%;
  display: flex;
  margin-inline: auto;
  align-items: center;
`;
const StockTable = () => {
  const keys = useSelector((state) => state.stock.keys);
  const searchResults = useSelector((state) => state.stock.searchResults);
  const [loading, setLoading] = useState(true);
  const config = { delimeter: "," };
  const dispatch = useDispatch();

  useEffect(() => {
    Papa.parse("https://prototype.sbulltech.com/api/v2/instruments", {
      ...config,
      header: true,
      download: true,
      complete: (results) => {
        let key = Object.keys(results.data[0]);
        dispatch(getKeys(key));
        dispatch(getStocks(results.data));
        setLoading(false);
      },
    });
  },[]);

  return (
    <Wrapper>
      {loading? <Spinner/>:
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 575,

          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-track": {
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: " lightgray",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "dimgray",
          },
        }}
      >
        <Table
          sx={{
            minWidth: 650,
          }}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              {keys?.map((row) => (
                <TableCell
                  key={row}
                  align="justify"
                  sx={{ fontWeight: 600, bgcolor: "#f2f2f2" }}
                >
                  {row === "Validtill" ? "" : row}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {searchResults?.map((row) => (
              <TableRow
                key={row.Symbol}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  textDecoration: "none",
                }}
              >
                <TableCell
                  align="justify"
                  style={{ fontFamily: "Silkscreen", fontWeight: 700 }}
                >
                  <Link
                    to={`/quote/${row.Symbol}`}
                    style={{ color: "#000", textDecoration: "none" }}
                  >
                    {row.Symbol}
                  </Link>
                </TableCell>
                <TableCell align="justify">{row.Name}</TableCell>
                <TableCell align="justify">{row.Sector}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </Wrapper>
  );
};

export default StockTable;
