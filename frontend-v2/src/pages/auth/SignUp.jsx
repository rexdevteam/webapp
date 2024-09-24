import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { sendApiRequest, fetchCountries } from "../../services/api";
import { signupSchema } from "../../services/validationSchemas";
import { AuthContext } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";

import Btn from "../../components/ui/Btn";

const SignUp = () => {
    const navigate = useNavigate();
	const { setAlert, persistAlert } = useAlert();
	const [countries, setCountries] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const getCountries = async () => {
			try {
				const data = await fetchCountries();
				setCountries(data.countries);
			} catch (error) {
				console.error("Error fetching countries:", error);
			}
		};

		getCountries();
	}, []);

    const handleSubmit = async (values, { setSubmitting }) => {
		setIsLoading(true);
		try {
			const data = await sendApiRequest("/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});
			console.log(data);

			persistAlert(data?.message, "success");
			navigate("/login");
		} catch (err) {
			setAlert(err.message || "Sign up failed", "error");
			console.error("Signup failed", err);
		} finally {
			setIsLoading(false);
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
				initialValues={{
					email: "",
					firstname: "",
					lastname: "",
					country: "",
					gender: "male",
					password: "",
				}}
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
							<label htmlFor="firstname">First Name</label>
							<Field
								name="firstname"
								type="text"
								label="First Name"
								margin="normal"
								className="rounded form-control"
							/>
							<ErrorMessage
								name="firstname"
								component="div"
								className="err-msg"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="lastname">Last Name</label>
							<Field
								name="lastname"
								type="text"
								label="Last Name"
								margin="normal"
								className="rounded form-control"
							/>
							<ErrorMessage
								name="lastname"
								component="div"
								className="err-msg"
							/>
						</div>
						<div className="form-group">
							<label className="label">Gender</label>
							<Field
								as="select"
								name="gender"
								className="rounded form-control"
							>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="other">Other</option>
							</Field>
							<ErrorMessage
								name="gender"
								component="div"
								className="err-msg"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="country">Country</label>
							<Field
								as="select"
								name="country"
								className="rounded form-control"
							>
								<option value="">Select Country</option>
								{countries.map((country) => (
									<option key={country} value={country}>
										{country}
									</option>
								))}
							</Field>
							<ErrorMessage
								name="country"
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

						<div className="form-group">
							<label htmlFor="confirmPassword">
								Confirm Password
							</label>
							<Field
								name="confirmPassword"
								type="password"
								label="Confirm Password"
								margin="normal"
								className="rounded form-control"
							/>
							<ErrorMessage
								name="confirmPassword"
								component="div"
								className="err-msg"
							/>
						</div>

						<Btn
							txt={"Sign Up"}
							type="submit"
							isLoading={isSubmitting || isLoading}
						/>
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