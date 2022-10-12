import React, { useEffect } from "react";
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

const Wrapper = styled(Box)`
  /* top: 80%; */
  margin-top: 20vh;
  max-width: 80%;
  display: flex;
  margin-inline: auto;
  align-items: center;
  /* justify-content: flex-end; */
`;
const StockTable = () => {
  const keys = useSelector((state) => state.stock.keys);
  const data = useSelector((state) => state.stock.stocks);
  const searchResults = useSelector((state) => state.stock.searchResults);

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
        console.log("result =>..", results.data);
        dispatch(getStocks(results.data));
      },
    });
  }, []);
  // console.log(searchResults);

  return (
    <Wrapper>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 575,
          // scrollbarWidth: "none",

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
                <TableCell key={row} align="justify" sx={{ fontWeight: 600 }}>
                  {row == "Validtill" ? "" : row}
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
                }}
              >
                <TableCell
                  align="justify"
                  style={{ fontFamily: "Silkscreen", fontWeight: 700 }}
                >
                  {row.Symbol}
                </TableCell>
                <TableCell align="justify">{row.Name}</TableCell>
                <TableCell align="justify">{row.Sector}</TableCell>
                {/* <TableCell align="justify">{row.Validtill}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

export default StockTable;
