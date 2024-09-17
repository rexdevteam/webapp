// src/pages/Home.js
import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Typography, Button } from "@mui/material";

const Home = () => (
	<Container>
		<Helmet>
			<title>Home - My App</title>
		</Helmet>

		<Typography variant="h4" gutterBottom>
			Welcome to My App
		</Typography>

		<Button variant="contained" color="primary">
			Get Started
		</Button>
	</Container>
);

export default Home;
