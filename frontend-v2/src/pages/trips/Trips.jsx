import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Typography, Button } from "@mui/material";
import "./trips.css"

const Trips = () => (
	<Container>
		<Helmet>
			<title>Trips - My App</title>
		</Helmet>

		<Typography variant="h4" gutterBottom>
			Trips Page
		</Typography>
	</Container>
);

export default Trips;
