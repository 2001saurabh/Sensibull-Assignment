import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  styled,
  IconButton,
  Divider,
} from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { visuallyHidden } from "@mui/utils";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../../comoponents/Loader";
import Layout from "../../../comoponents/layout";

const Wrapper = styled(Box)`
  margin-top: 5vh;
  max-width: 90%;
  display: flex;
  margin-inline: auto;
  align-items: center;
`;

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort, tableHeadCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead sx={{ bgcolor: "#f2f2f2" }}>
      <TableRow>
        {tableHeadCells.map((headCell, index) => (
          <TableCell
            key={index}
            sortDirection={orderBy === headCell ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell}
              direction={orderBy === headCell ? order : "asc"}
              onClick={createSortHandler(headCell)}
            >
              <Typography
                sx={{
                  textTransform: "uppercase",
                  fontSize: "18px",
                  fontWeight: 500,
                }}
              >
                {headCell}
                {orderBy === headCell ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </Typography>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  tableHeadCells: PropTypes.array.isRequired,
};

//Api endpoint
const QuoteApiEndpoint = "https://prototype.sbulltech.com/api/v2/quotes/";

const QuotesTable = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tableHeadData, setTableHeadData] = useState([]);
  const [tableBodyData, setTableBodyData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [validTill, setValidTill] = useState();
  const [curTime, setCurTime] = useState();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    validTill &&
      curTime &&
      setTimeout(() => {
        document.location.reload();
      }, new Date(validTill) - new Date(curTime));
  }, [validTill, curTime]);

  // calling quotes api
  useEffect(() => {
    axios.get(QuoteApiEndpoint + symbol).then((res) => {
      const keys = Object.keys(res.data.payload[symbol][0]);
      setLoading(false);
      setTableHeadData(keys);
      setOrderBy(keys[0]);
      setTableBodyData(res.data.payload[symbol]);

      // for refreshing page till valid_till
      const time = res.data.payload[symbol].map((t) => t.time);
      time.sort((a, b) => (a > b ? -1 : b > a ? 1 : 0));
      const valid_Till = res.data.payload[symbol].map((v) => v.valid_till);
      valid_Till.sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));
      setCurTime(time[0]);
      setValidTill(valid_Till[0]);
    });
  }, [symbol]);

  return (
    <>
      <Layout disableSearch={true} />
      <Box
        sx={{
          mt: "15vh",
          p: "5px",
          maxWidth: "95%",
          display: "flex",
          mx: "auto",
        }}
      >
        <Toolbar>
          <IconButton onClick={() => navigate(-1) || navigate("/")}>
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 700, ml: 2 }}
          >
            {symbol}
          </Typography>
        </Toolbar>
      </Box>
      <Divider variant="middle" />
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <Wrapper>
          <TableContainer component={Paper} elevation={4}>
            <Table>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                tableHeadCells={tableHeadData}
              />
              <TableBody>
                {stableSort(tableBodyData, getComparator(order, orderBy)).map(
                  (elem, index) => {
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          <Typography sx={{ fontWeight: 700 }}>
                            {elem.price}
                          </Typography>
                        </TableCell>
                        <TableCell>{elem.time}</TableCell>
                        <TableCell>{elem.valid_till}</TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Wrapper>
      )}
    </>
  );
};

export default QuotesTable;
