// src/pages/Home.js
import React from "react";
import { Helmet } from "react-helmet-async";
import "./dashboard.css"

import PageHead from "../../components/page/PageHead";
import LinkBtn from "../../components/ui/LinkBtn";

const Dashboard = () => {
	const linkBtn = <LinkBtn txt={"Create New Trip"} link="/trip/new" />;

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
						<span></span>
					</div>
					<div className="stat">100</div>
				</div>
				<div className="card metrics-card">
					<div className="title flex">
						<div className="label">Trips</div>
						<span></span>
					</div>
					<div className="stat">100</div>
				</div>
				<div className="card metrics-card">
					<div className="title flex">
						<div className="label">Trips</div>
						<span></span>
					</div>
					<div className="stat">100</div>
				</div>
				<div className="card metrics-card">
					<div className="title flex">
						<div className="label">Trips</div>
						<span></span>
					</div>
					<div className="stat">100</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
