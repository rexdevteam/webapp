import React, { useState, useContext } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";


import { sendApiRequest } from "../../services/api";
import { loginSchema } from "./validationSchemas";
import { AuthContext } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";
import { useAuth } from "../../context/AuthContext";

import Btn from "../../components/ui/Btn";

const Login = () => {
	const { login, auth } = useAuth();
	const navigate = useNavigate();
	const { setAlert, persistAlert } = useAlert();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (values, { setSubmitting }) => {
		setIsLoading(true);
		try {
			const data = await sendApiRequest("/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});
			console.log(data);

			const { access_token, user_data } = data.data;

			login(user_data, access_token);
			persistAlert(data?.message, "success");
			navigate("/");
		} catch (err) {
			setAlert(err.message || "Login failed", "error");
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
								className="rounded form-control"
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
								className="rounded form-control"
							/>
							<ErrorMessage
								name="password"
								component="div"
								className="err-msg"
							/>
						</div>

						<Btn txt={"Login"} type="submit" isLoading={isSubmitting || isLoading} />
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
