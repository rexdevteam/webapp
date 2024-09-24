import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

import { newExpenseSchema } from "../../services/validationSchemas";
import { sendApiRequest, fetchTrips } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";

import Btn from "../../components/ui/Btn";
import PageHead from "../../components/page/PageHead";
import IcoInput from "../../components/ui/icoInput/IcoInput";

const NewExpense = () => {
    const navigate = useNavigate();
	const [trips, setTrips] = useState([]);
	const { setAlert, persistAlert } = useAlert();
	const { user_profile, loading } = useAuth();

    useEffect(() => {
		const getTrips = async () => {
			try {
				const data = await fetchTrips();
				setTrips(data.trips);
			} catch (error) {
				console.error("Error fetching trips:", error);
			}
		};

		getTrips();
	}, []);


    const handleSubmit = async (values, { setSubmitting }) => {
		try {
			const data = await sendApiRequest("/expenses", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			persistAlert(data?.message, "success");
			navigate("/expenses");
		} catch (error) {
			console.error("Error updating profile:", error);
			setAlert(error?.message, "error");
		} finally {
			setSubmitting(false);
		}
	};

    return (
		<div id="new-expense">
			<Helmet>
				<title>New Expense - Expense Voyage</title>
			</Helmet>

			<PageHead title={"Add New Expense"} />

			<div className="form-container">
				<div id="trip-form" className="card form-wrapper">
					<Formik
						initialValues={{
							name: "",
							amount: "",
							trip_id: "",
						}}
						validationSchema={newExpenseSchema}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting, values }) => (
							<Form>
								<div className="form-groups">
									<div className="form-group">
										<label className="label">Name</label>
										<Field
											type="text"
											name="name"
											className="rounded form-control"
										/>
										<ErrorMessage
											name="name"
											component="div"
											className="err-msg"
										/>
									</div>

									<div className="form-group">
										<label className="label">Amount</label>
										<Field
											as={IcoInput}
											icon={user_profile.currency_symbol}
											type="number"
											name="amount"
											className="rounded form-control"
										/>
										<ErrorMessage
											name="amount"
											component="div"
											className="err-msg"
										/>
									</div>

									<div className="form-group">
										<label className="label">Trip</label>
										<Field
											as="select"
											name="trip_id"
											className="rounded form-control"
										>
											<option value="">
												Select Trip
											</option>
											{trips.map((trip) => (
												<option
													key={trip.id}
													value={trip.id}
												>
													{trip.destination}
												</option>
											))}
										</Field>
										<ErrorMessage
											name="trip_id"
											component="div"
											className="err-msg"
										/>
									</div>
								</div>

								<Btn
									txt={"Submit"}
									type="submit"
									isLoading={isSubmitting}
								/>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}

export default NewExpense
