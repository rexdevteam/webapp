import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Typography, Button } from "@mui/material";

const Profile = () => (
	<Container>
		<Helmet>
			<title>Profile - My App</title>
		</Helmet>

		<Typography variant="h4" gutterBottom>
			Profile Page
		</Typography>

	</Container>
);

export default Profile;
