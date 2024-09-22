// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";

import "./dashboard.css";
import { sendApiRequest } from '../../services/api';
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
	
	const linkBtn = <LinkBtn txt={"Create New Trip"} link="/trip/new" />;

	// Define columns and data for the Table component
	const columns = [
		{ field: "id", headerName: "ID" },
		{ field: "destination", headerName: "Destination" },
		{ field: "start_date", headerName: "Start Date " },
		{ field: "end_date", headerName: "End Date" },
		{ field: "amount", headerName: "Budget" },
		{ field: "edit", headerName: "edit" },
	];

	return (
		<div id="dashboard">
			<Helmet>
				<title>Dashboard - My App</title>
			</Helmet>

			<PageHead title={"Dashboard"} headBtn={linkBtn} />

			<div className="metrics grid">
				<div className="card metrics-card">
					<div className="title flex">
						<div className="label">Trips</div>
					</div>
					<div className="stat">{tripNum}</div>
					<span>
						<i className="bx bxs-plane-alt bx-plane"></i>
					</span>
				</div>

				<div className="card metrics-card">
					<div className="title flex">
						<div className="label">Budget</div>
					</div>
					<div className="stat">{tripBudget}</div>
					<span>
						<i className="bx bx-dollar-circle bx-dolls"></i>
					</span>
				</div>

				<div className="card metrics-card">
					<div className="title flex">
						<div className="label">Expenses</div>
					</div>
					<div className="stat">{tripExpenses}</div>
					<span>
						<i className="bx bx-cart-download bx-down"></i>
					</span>
				</div>
			</div>

			<section>
				<Table
					head={"Trips Overview"}
					isLoading={loadingTripTable}
					columns={columns}
					data={trips}
				/>
			</section>
			
			<br />
			<Charts />
		</div>
	);
};

export default Dashboard;
