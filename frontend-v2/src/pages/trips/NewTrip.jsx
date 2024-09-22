import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

import { newTripSchema } from "../../services/validationSchemas";
import { sendApiRequest, fetchCategories } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";

import Btn from "../../components/ui/Btn";
import PageHead from "../../components/page/PageHead";
import SubItineraryForm from "./SubItineraryForm";
import ItineraryInputs from "./ItineraryInputs";

const NewTrip = () => {
	const navigate = useNavigate();
	const { setAlert, persistAlert } = useAlert();
	const [categories, setCategories] = useState([]);

    useEffect(() => {
		const getCategories = async () => {
			try {
				const data = await fetchCategories();
				setCategories(data.itinerary_cats);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		getCategories();
	}, []);

    const handleSubmit = async (values, { setSubmitting }) => {
		try {
			const data = await sendApiRequest("/trips", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			setAlert(data?.message, "success");
			navigate("/trips");
		} catch (error) {
			console.error("Error adding Trips:", error);
			setAlert(error?.message, "error");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div id="new-trip">
			<Helmet>
				<title>New Trip - Expense Voyage</title>
			</Helmet>

			<PageHead title={"Add New Trip"} />

			<div className="form-container">
				<div id="trip-form" className="card form-wrapper">
					<Formik
						initialValues={{
							destination: "",
							amount: "",
							start_date: "",
							end_date: "",
							itineraries: [],
						}}
						validationSchema={newTripSchema}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting, values }) => (
							<Form>
								<div className="form-groups grid">
									<div className="form-group no-margin">
										<label className="label">
											Destination
										</label>
										<Field
											type="text"
											name="destination"
											className="rounded form-control"
										/>
										<ErrorMessage
											name="destination"
											component="div"
											className="err-msg"
										/>
									</div>

									<div className="form-group no-margin">
										<label className="label">Budget</label>
										<Field
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
								</div>

								<div className="form-groups grid">
									<div className="form-group no-margin">
										<label className="label">
											Start Date
										</label>
										<Field
											type="date"
											name="start_date"
											className="rounded form-control"
										/>
										<ErrorMessage
											name="start_date"
											component="div"
											className="err-msg"
										/>
									</div>

									<div className="form-group no-margin">
										<label className="label">
											End Date
										</label>
										<Field
											type="date"
											name="end_date"
											className="rounded form-control"
										/>
										<ErrorMessage
											name="end_date"
											component="div"
											className="err-msg"
										/>
									</div>
								</div>

								<SubItineraryForm
									values={values}
									categories={categories}
								/>

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
};

export default NewTrip;
