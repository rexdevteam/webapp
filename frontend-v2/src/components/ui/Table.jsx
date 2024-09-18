import React from 'react'
import {
	TableContainer,
	Table as MuiTable,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
} from "@mui/material";

const Table = ({ columns, data }) => {
    return (
		<TableContainer component={Paper}>
			<MuiTable>
				<TableHead>
					<TableRow>
						{columns.map((column) => (
							<TableCell key={column.field}>
								{column.headerName}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row, index) => (
						<TableRow key={index}>
							{columns.map((column) => (
								<TableCell key={column.field}>
									{row[column.field]}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</MuiTable>
		</TableContainer>
	);
}

export default Table
