import React from "react";
import format from "date-fns/format";
import {
	TableContainer,
	Table as MuiTable,
	TableHead,
	TableRow,
	TableCell,
	tableCellClasses,
	TableBody,
	Paper,
	styled,
	Pagination,
} from "@mui/material";

import Btn from "./Btn";
import LoadingData from "./LoadingData";
import "./table/table.css"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#c7f8fc",
		color: theme.palette.common.black,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const Table = ({ isLoading = false, actions=false, columns, data, head, foot, paginate, handleViewDetails }) => {
	return (
		<div className="table-wrapper">
			{head && (
				<div className="table-head">
					{" "}
					<span className="title"> {head} </span>{" "}
				</div>
			)}

			<div className="table-body">
				{isLoading ? (
					<LoadingData />
				) : (
					<TableContainer component={Paper}>
						<MuiTable>
							<TableHead>
								<TableRow>
									{columns.map((column) => (
										<StyledTableCell key={column.field}>
											{column.headerName}
										</StyledTableCell>
									))}
									{actions && (
										<StyledTableCell>
											Actions
										</StyledTableCell>
									)}
								</TableRow>
							</TableHead>

							<TableBody>
								{data.map((row, index) => (
									<TableRow key={index}>
										{columns.map((column) => (
											<TableCell key={column.field}>
												{column.field === "id"
													? index + 1
													: !isNaN(
															Date.parse(
																row[
																	column.field
																]
															)
													  )
													? format(
															new Date(
																row[
																	column.field
																]
															),
															"MMM do, yyyy"
													  )
													: row[column.field]}
											</TableCell>
										))}

										{handleViewDetails && (
											<TableCell>
												<Btn
													txt={"View"}
													className="ghost-rounded"
													handleClick={() =>
														handleViewDetails(
															row.id
														)
													}
												/>
											</TableCell>
										)}
									</TableRow>
								))}
							</TableBody>
						</MuiTable>
					</TableContainer>
				)}
			</div>

			{foot && (
				<div className="table-foot">
					{paginate ? (
						<Pagination
							count={paginate.totalPages}
							page={paginate.page}
							onChange={paginate.handlePageChange}
							shape="rounded"
							color="primary"
						/>
					) : (
						<></>
					)}
				</div>
			)}
		</div>
	);
};

export default Table;
