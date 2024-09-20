import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { CircularProgress, Typography } from "@mui/material";

import { useAlert } from '../../context/AlertContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { sendApiRequest, setAuthToken } from "../../services/api.js";
import PageHead from "../../components/page/PageHead";
import LoadingPage from '../../components/ui/LoadingPage.jsx';
import NoData from '../../components/ui/NoData.jsx';
import LinkBtn from "../../components/ui/LinkBtn";
import Table from "../../components/ui/Table.jsx";
import "./trips.css"


const Trips = () => {
	const { access_token } = useAuth();
	const [trips, setTrips] = useState([]);
	const [loading, setLoading] = useState(true);
	const { setAlert } = useAlert();

	useEffect(() => {
		setAuthToken(access_token);
		
		const getTrips = async () => {
			try {
				const data = await sendApiRequest("/trips", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				console.log(data);
				
				setTrips(data.data.trips);
			} catch (err) {
				setAlert(
					err?.message || "Couldn't fetch trips",
					"error"
				);
				console.error("Error fetching Trips", err);
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

	if (loading) return <LoadingPage />;
	
	const linkBtn = <LinkBtn txt={"Create New Trip"} link="/trip/new" />;

	return (
		<div id="trips">
			<Helmet>
				<title>Trips - Expense Voyage</title>
			</Helmet>


			{trips.length > 0 ? (
				<>
					<PageHead title={"Trips"} headBtn={linkBtn} />
					<Table columns={columns} data={trips} />
				</>
			) : (
				<NoData title={"No trips available"} headBtn={linkBtn} />
			)}
		</div>
	);
}

export default Trips;
