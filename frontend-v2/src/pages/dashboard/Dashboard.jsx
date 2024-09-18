// src/pages/Home.js
import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Typography, Button } from "@mui/material";
import "./dashboard.css"

const Dashboard = () => (
	<>
		<Helmet>
			<title>Dashboard - My App</title>
		</Helmet>

		<div className="wrapper-head flex">
			<h1> Dashboard </h1>
			<a href="" className="btn rounded">
				{" "}
				Create New Trip{" "}
			</a>
		</div>

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
	</>
);

export default Dashboard;
