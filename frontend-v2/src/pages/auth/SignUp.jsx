import React, { useState, useContext } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import AuthForm from "./AuthForm";
import { signupSchema } from "./validationSchemas";
import { AuthContext } from "../../context/AuthContext";

const SignUp = () => {
    const { login } = useContext(AuthContext);
	const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
		try {
			const response = await axios.post(
				"https://api.example.com/signup",
				values
			);
			const { access_token, user_data } = response.data.data;

			login(user_data, access_token);
			navigate("/");
		} catch (err) {
			console.error("Login failed", err);
		} finally {
			setSubmitting(false);
		}
	};

    return (
		<>
			<Helmet>
				<title>Sign Up - Expense Voyage</title>
			</Helmet>

			<div className="form-head">
				<h3 className="form-title">Expense Voyage</h3>
				<p className="form-tagline">
					Please enter your user information.
				</p>
			</div>

			<Formik
				initialValues={{ email: "", password: "" }}
				validationSchema={signupSchema}
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
						</div>

						<div className="form-group">
							<label htmlFor="password">Confirm Password</label>
							<Field
								name="confirmPassword"
								type="password"
								label="Confirm Password"
								margin="normal"
							/>
						</div>

						<button type="submit" className="btn rounded">
							{"Sign Up"}
						</button>
					</Form>
				)}
			</Formik>

			<div className="form-footer flex flex-space-between">
				<span className="links">
					<Link to="/login">Already member? Login</Link>
				</span>
			</div>
		</>
	);
}

export default SignUp