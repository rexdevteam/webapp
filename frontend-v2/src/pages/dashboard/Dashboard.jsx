// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";

// icons
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import SavingsIcon from "@mui/icons-material/Savings";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import SubjectIcon from "@mui/icons-material/Subject";

import "./dashboard.css";
import { sendApiRequest } from '../../services/api';
import Metrics from './metrics/Metrics';
import Table from '../../components/ui/Table'; // Custom Table component
import PageHead from "../../components/page/PageHead";
import LinkBtn from "../../components/ui/LinkBtn";
import Charts from './charts/Charts';

const Dashboard = () => {
	const [tripNum, setTripNum] = useState(0);
	const [tripBudget, setTripBudget] = useState(0);
	const [tripExpenses, setTripExpenses] = useState(0);

	const [trips, setTrips] = useState([]);
	const [loadingTripTable, setLoadingTripTable] = useState(true);
	const [tripPage, setTripPage] = useState(1);
	const [tripTotalPages, setTripTotalPages] = useState(1);


	useEffect(() => {
		const getTrips = async () => {
			try {
				const data = await sendApiRequest(`/trips?page=${tripPage}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				console.log(data);

				setTrips(data.data.trips);
				setTripTotalPages(data.data.total_pages);
			} catch (err) {
				console.error("Error fetching Trips", err);
			} finally {
				setLoadingTripTable(false);
			}
		};

		getTrips();
	}, [tripPage]);
	
	const linkBtn = <LinkBtn txt={"Create New Trip"} link="/trips/new" />;

	// Define columns and data for the Table component
	const columns = [
		{ field: "id", headerName: "ID" },
		{ field: "destination", headerName: "Destination" },
		{ field: "start_date", headerName: "Start Date " },
		{ field: "end_date", headerName: "End Date" },
		{ field: "amount", headerName: "Budget" },
	];

	return (
		<div id="dashboard">
			<Helmet>
				<title>Dashboard - My App</title>
			</Helmet>

			<PageHead title={"Dashboard"} headBtn={linkBtn} />

			<Metrics />

			<section>
				<Table
					head={"Trips Overview"}
					isLoading={loadingTripTable}
					columns={columns}
					data={trips}
				/>
			</section>

			<Charts />
		</div>
	);
};

export default Dashboard;
