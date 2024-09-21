import React from "react";
import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  tableCellClasses,
  TableBody,
  Paper,
  styled
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#c7f8fc",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Table = ({ columns, data }) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column.field}>{column.headerName}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.field}>{row[column.field]}</TableCell>
              
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
