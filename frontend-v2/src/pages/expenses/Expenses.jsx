import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Typography, Button } from "@mui/material";

const Expense = () => (
	<Container>
		<Helmet>
			<title>Expense - My App</title>
		</Helmet>

		<Typography variant="h4" gutterBottom>
			Expense Page
		</Typography>
	</Container>
);

export default Expense;
