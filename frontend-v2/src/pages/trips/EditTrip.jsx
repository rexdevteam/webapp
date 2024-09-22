import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { newTripSchema } from "../../services/validationSchemas";
import { sendApiRequest, fetchCategories, fetchTrip } from "../../services/api";
import { useAlert } from "../../context/AlertContext";

import Btn from "../../components/ui/Btn";
import PageHead from "../../components/page/PageHead";
import SubItineraryForm from "./SubItineraryForm";
import LoadingPage from "../../components/ui/LoadingPage";

const EditTrip = () => {
	const navigate = useNavigate();
	const { setAlert } = useAlert();
	const { id } = useParams();
    const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	const [initialValues, setInitialValues] = useState({
		destination: "",
		amount: "",
		start_date: "",
		end_date: "",
		itineraries: [],
	});

	useEffect(() => {
		const getCategories = async () => {
			try {
				const data = await fetchCategories();
				setCategories(data.itinerary_cats);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		const getTrip = async () => {
			try {
				const data = await fetchTrip(id);
				setInitialValues(data.trip);
			} catch (error) {
				console.error("Error fetching trip:", error);
			} finally {
                setLoading(false);
            }
		};

		getCategories();
		getTrip();
	}, [id]);

    const formatDate = (dateString) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const handleSubmit = async (values, { setSubmitting }) => {
        const formattedValues = {
			...values,
			start_date: formatDate(values.start_date),
			end_date: formatDate(values.end_date),
			itineraries: values.itineraries.map((itinerary) => ({
				...itinerary,
				itinerary_id: itinerary.id,
			})),
		};

		try {
			const data = await sendApiRequest(`/trips/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formattedValues),
			});

			setAlert(data?.message, "success");
			navigate(`/trips/${id}`);
		} catch (error) {
			console.error("Error updating trip:", error);
			setAlert(error?.message, "error");
		} finally {
			setSubmitting(false);
		}
	};

    if (loading) return <LoadingPage />;

	return (
		<div id="edit-trip">
			<Helmet>
				<title>Edit Trip - Expense Voyage</title>
			</Helmet>

			<PageHead title={"Edit Trip"} />

			<div className="form-container">
				<div id="trip-form" className="card form-wrapper">
					<Formik
						initialValues={initialValues}
						enableReinitialize
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

export default EditTrip;
