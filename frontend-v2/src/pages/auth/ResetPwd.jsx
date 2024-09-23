import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { sendApiRequest } from "../../services/api";
import { resetPwdSchema } from "../../services/validationSchemas";
import { useAlert } from "../../context/AlertContext";
import { useAuth } from "../../context/AuthContext";

import Btn from "../../components/ui/Btn";

const ResetPwd = () => {
	const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
	const { setAlert, persistAlert } = useAlert();
	const [isLoading, setIsLoading] = useState(false);
    const [resetToken, setResetToken] = useState(
		searchParams.get("reset_token")
	);

    useEffect(() => {
		const resetToken = searchParams.get("reset_token");

		console.log("resetToken:", resetToken); // get new values on change

		setSearchParams({ reset_token: resetToken });
	}, [searchParams]);

	const handleSubmit = async (values, { setSubmitting }) => {
		setIsLoading(true);
		try {
            const data = await sendApiRequest("/reset-password", {
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
				<title>Reset Password - Expense Voyage</title>
			</Helmet>

			<div className="form-head">
				<h3 className="form-title">Expense Voyage</h3>
				<p className="form-tagline">Please enter your new password</p>
			</div>

			<Formik
				initialValues={{
					new_password: "",
					confirmPassword: "",
				}}
				validationSchema={resetPwdSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form>
						<div className="form-group">
							<label htmlFor="password">New Password</label>
							<Field
								name="new_password"
								type="password"
								label="New Password"
								margin="normal"
								className="rounded form-control"
							/>
							<ErrorMessage
								name="new_password"
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

						<div className="form-group">
							<Field
								name="reset_token"
								type="hidden"
								margin="normal"
								value={resetToken}
							/>
							<ErrorMessage
								name="reset_token"
								component="div"
								className="err-msg"
							/>
						</div>

						<Btn
							txt={"Reset"}
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
			</div>
		</>
	);
};

export default ResetPwd;
