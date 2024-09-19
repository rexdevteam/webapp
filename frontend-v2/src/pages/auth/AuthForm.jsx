import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./auth.css";

const AuthForm = ({ initialValues, validationSchema, onSubmit, formType }) => {
	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({ isSubmitting }) => (
					<Form>
						<div class="form-group">
							<label for="email">Email or Phone</label>
							<Field
								name="email"
								type="email"
								label="Email"
								fullWidth
								margin="normal"
								className="rounded"
								helperText={<ErrorMessage name="email" />}
							/>
						</div>
						<div class="form-group">
							<label for="password">Password</label>
							<Field
								name="password"
								type="password"
								label="Password"
								fullWidth
								margin="normal"
								className="rounded"
								helperText={<ErrorMessage name="password" />}
							/>
						</div>
						
						{formType === "signup" && (
							<Field
								name="confirmPassword"
								type="password"
								label="Confirm Password"
								fullWidth
								margin="normal"
								helperText={
									<ErrorMessage name="confirmPassword" />
								}
							/>
						)}

						<button type="submit" className="btn rounded">
							{formType === "login" ? "Login" : "Sign Up"}
						</button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default AuthForm