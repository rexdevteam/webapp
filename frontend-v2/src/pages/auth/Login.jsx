import React, { useState, useContext } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";


import { loginSchema } from "./validationSchemas";
import { AuthContext } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
	const { login, auth } = useAuth();
	const navigate = useNavigate();
	const { setAlert, persistAlert } = useAlert();
	const [isLoading, setIsLoading] = useState(false);

	console.log(auth.isAuthenticated);

	const handleSubmit = async (values, { setSubmitting }) => {
		setIsLoading(true);
		try {
			const response = await axios.post(
				"https://expense-voyage-api.onrender.com/api/login",
				values
			);
			const { access_token, user_data } = response.data.data;

			console.log(access_token);

			login(user_data, access_token);
			persistAlert(response.data?.message, "success");
			navigate("/");
		} catch (err) {
			setAlert(err.response?.data?.message || "Login failed", 'error');
			console.error("Login failed", err);
		} finally {
			setIsLoading(false);
			setSubmitting(false);
		}
	};

	return (
		<>
			<Helmet>
				<title>Login - Expense Voyage</title>
			</Helmet>

			<div className="form-head">
				<h3 className="form-title">Expense Voyage</h3>
				<p className="form-tagline">
					Please enter your user information.
				</p>
			</div>

			<Formik
				initialValues={{ email: "", password: "" }}
				validationSchema={loginSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<Field
								name="email"
								type="email"
								label="Email"
								margin="normal"
								className="rounded"
								placeholder="example@mail.com"
							/>
							<ErrorMessage
								name="email"
								component="div"
								className="err-msg"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<Field
								name="password"
								type="password"
								label="Password"
								margin="normal"
								className="rounded"
							/>
							<ErrorMessage
								name="password"
								component="div"
								className="err-msg"
							/>
						</div>

						<button
							type="submit"
							className="btn rounded"
							disabled={isSubmitting || isLoading}
						>
							{isSubmitting || isLoading ? "Loading..." : "Login"}
						</button>
					</Form>
				)}
			</Formik>

			<div className="form-footer flex flex-space-between">
				<span className="links">
					<Link to="/signup"> Create An Account </Link>
				</span>

				<span className="links">
					<Link to="/forgot-password"> Forgot Password </Link>
				</span>
			</div>
		</>
	);
};

export default Login;
