// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import "./dashboard.css";
import Table from '../../components/ui/Table'; // Custom Table component
import PageHead from "../../components/page/PageHead";
import LinkBtn from "../../components/ui/LinkBtn";

const Dashboard = () => {
	const [tripNum, setTripNum] = useState(0);
	const [tripBudget, setTripBudget] = useState(0);
	const [tripExpenses, setTripExpenses] = useState(0);
	
	const linkBtn = <LinkBtn txt={"Create New Trip"} link="/trip/new" />;

	// Define columns and data for the Table component
		const columns = [
      { field: "id", headerName: "ID" },
      { field: "destination", headerName: "Destination" },
      { field: "date", headerName: "Flight  Date " },
      { field: "datetoteturn", headerName: "Date of return" },
      { field: "amount", headerName: "Amount" },
      { field: "amount", headerName: "edit" },
      { field: "amount", headerName: "intineries" },
    ];

	const data = [
		{ id: 1, destination: 'Paris', datetoteturn:"2024-09-05",  date: '2024-06-15' },
		{ id: 2, destination: 'Tokyo', datetoteturn:"2024-09-05", date: '2024-07-01' },
		{ id: 3, destination: 'New York', datetoteturn:"2024-09-05", date: '2024-07-20' },
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
						<i className='bx bxs-plane-alt bx-plane'></i>
					</span>
				</div>

				<div className="card metrics-card">
					<div className="title flex">
						<div className="label">Budget</div>
					</div>
					<div className="stat">{tripBudget}</div>
					<span>
						<i className='bx bx-dollar-circle bx-dolls'></i>
					</span>
				</div>

				<div className="card metrics-card">
					<div className="title flex">
						<div className="label">Expenses</div>
					</div>
					<div className="stat">{tripExpenses}</div>
					<span>
						<i className='bx bx-cart-download bx-down'></i>	

					</span>
				</div>
			</div>

			<div className='dash-table'>
				<fieldset className='dash-fieldset' >
					<div className='dash-head-cont'> 
						<h4  className='dash-head'>Open trips</h4>	
					</div>
			<Table columns={columns} data={data} />
				</fieldset>
			</div>
		</div> 
	);
};

export default Dashboard;
