import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CircularProgress, Typography, Pagination } from "@mui/material";

import { useAlert } from '../../context/AlertContext.jsx';
import { sendApiRequest } from "../../services/api.js";
import PageHead from "../../components/page/PageHead";
import LoadingPage from '../../components/ui/LoadingPage.jsx';
import LoadingData from '../../components/ui/LoadingData.jsx';
import NoData from '../../components/ui/NoData.jsx';
import LinkBtn from "../../components/ui/LinkBtn";
import Table from "../../components/ui/Table.jsx";
import "./trips.css"


const Trips = () => {
	const navigate = useNavigate();
	const [trips, setTrips] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadingTable, setLoadingTable] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	
	const { setAlert } = useAlert();

	useEffect(() => {
		const getTrips = async () => {
			try {
				const data = await sendApiRequest(`/trips?page=${page}&per_page=6`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				console.log(data);

				setTrips(data.data.trips);
				setTotalPages(data.data.total_pages);
			} catch (err) {
				setAlert(err?.message || "Couldn't fetch trips", "error");
				console.error("Error fetching Trips", err);
			} finally {
				setLoading(false);
				setLoadingTable(false);
			}
		};

		getTrips();
	}, [page]);

	const handlePageChange = (event, value) => {
		setLoadingTable(true);
		setPage(value);
	};

	const handleViewDetails = (id) => {
		navigate(`/trips/${id}`);
	};

	const columns = [
		{ field: "id", headerName: "ID" },
		{ field: "destination", headerName: "Destination" },
		{ field: "start_date", headerName: "Start Date " },
		{ field: "end_date", headerName: "End Date" },
		{ field: "amount", headerName: "Budget" },
	];

	if (loading) return <LoadingPage />;
	
	const linkBtn = <LinkBtn txt={"Create New Trip"} link="/trips/new" />;

	return (
		<div id="trips">
			<Helmet>
				<title>Trips - Expense Voyage</title>
			</Helmet>

			{trips.length > 0 ? (
				<>
					<PageHead title={"Trips"} headBtn={linkBtn} />
					<Table
						isLoading={loadingTable}
						columns={columns}
						data={trips}
						foot={true}
						actions={true}
						handleViewDetails={handleViewDetails}
						paginate={{ totalPages, page, handlePageChange }}
					/>
				</>
			) : (
				<NoData title={"No trips available"} headBtn={linkBtn} />
			)}
		</div>
	);
}

export default Trips;
