// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography, Container } from "@mui/material";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("https://api.example.com/login", {
				email,
				password,
			});
			const { access_token, user_data } = response.data.data;
			login(user_data, access_token);
			navigate("/");
		} catch (err) {
			setError("Invalid credentials");
		}
	};

	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				Login
			</Typography>
			{error && <Typography color="error">{error}</Typography>}
			<form onSubmit={handleSubmit}>
				<TextField
					label="Email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<Button type="submit" variant="contained" color="primary">
					Login
				</Button>
			</form>
		</Container>
	);
};

export default Login;
