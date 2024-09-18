import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { fetchData } from "../../services/api.js";
import { CircularProgress, Typography } from "@mui/material";
import Table from "../../components/ui/Table.jsx";
import "./trips.css"

import PageHead from "../../components/page/PageHead";
import LinkBtn from "../../components/ui/LinkBtn";

const Trips = () => {
	const [trips, setTrips] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getTrips = async () => {
			try {
				const data = await fetchData("/trips");
				setTrips(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		getTrips();
	}, []);

	const columns = [
		{ field: "id", headerName: "ID" },
		{ field: "destination", headerName: "Destination" },
		{ field: "date", headerName: "Date" },
		{ field: "amount", headerName: "Amount" },
	];

	if (loading) return <CircularProgress />;
	if (error) return <Typography color="error">{error}</Typography>;

	const linkBtn = <LinkBtn txt={"Create New Trip"} link="/trip/new" />;

	return (
		<div id="trips">
			<Helmet>
				<title>Trips - Expense Voyage</title>
			</Helmet>

			<PageHead title={"Trips"} headBtn={linkBtn} />

			<Table columns={columns} data={trips} />
		</div>
	);
}

export default Trips;
