import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { sendApiRequest } from "../../services/api";
import { loginSchema } from "../../services/validationSchemas";
import { useAlert } from "../../context/AlertContext";
import { useAuth } from "../../context/AuthContext";

import Btn from "../../components/ui/Btn";

const ForgotPwd = () => {
    const navigate = useNavigate();
	const { setAlert, persistAlert } = useAlert();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (values, { setSubmitting }) => {
		setIsLoading(true);
		try {
			const data = await sendApiRequest("/forgot-password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});
			console.log(data);

			const { email, msg } = data.data;

			persistAlert(data?.message, "success");
			navigate("/login");
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
				<title>Forgot Password - Expense Voyage</title>
			</Helmet>

			<div className="form-head">
				<h3 className="form-title">Expense Voyage</h3>
				<p className="form-tagline">Please enter your user email.</p>
			</div>

			<Formik
				initialValues={{ email: "" }}
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

						<Btn
							txt={"Send Email"}
							type="submit"
							isLoading={isSubmitting || isLoading}
						/>
					</Form>
				)}
			</Formik>

			<div className="form-footer flex flex-space-between">
				<span className="links">
					<Link to="/login"> Login </Link>
				</span>

				<span className="links">
					<Link to="/signup"> Create An Account </Link>
				</span>
			</div>
		</>
	);
};

export default ForgotPwd;
