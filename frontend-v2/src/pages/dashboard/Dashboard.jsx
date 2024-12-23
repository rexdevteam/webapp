// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";

import "./dashboard.css";
import { sendApiRequest } from '../../services/api';
import Metrics from './metrics/Metrics';
import Table from '../../components/ui/Table'; // Custom Table component
import PageHead from "../../components/page/PageHead";
import LinkBtn from "../../components/ui/LinkBtn";
import Charts from './charts/Charts';

import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
	const [trips, setTrips] = useState([]);
	const [loadingTripTable, setLoadingTripTable] = useState(true);
	const [tripPage, setTripPage] = useState(1);
	const [tripTotalPages, setTripTotalPages] = useState(1);

	const { user_profile } = useAuth();


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
		{ field: "id", headerName: "ID", minWidth: 20 },
		{ field: "destination", headerName: "Destination", minWidth: 50 },
		{
			field: "amount",
			headerName: `Budget (${user_profile.currency_symbol})`,
			minWidth: 170,
		},
		{ field: "start_date", headerName: "Start Date ", minWidth: 110 },
		{ field: "end_date", headerName: "End Date", minWidth: 110 },
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
