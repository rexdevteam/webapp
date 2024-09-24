import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { useAlert } from "../../context/AlertContext.jsx";
import { useAuth } from "../../context/AuthContext";
import { sendApiRequest } from "../../services/api.js";
import PageHead from "../../components/page/PageHead";
import LoadingPage from "../../components/ui/LoadingPage.jsx";
import LoadingData from "../../components/ui/LoadingData.jsx";
import LinkBtn from "../../components/ui/LinkBtn";
import TripInfo from "./TripInfo.jsx";
import "./trip_details.css";

const TripDetails = () => {
    const { id } = useParams();
	const [trip, setTrip] = useState(null);
	const [loading, setLoading] = useState(true);
	const { setAlert } = useAlert();
	const { user_profile } = useAuth();

    useEffect(() => {
		const getTripDetails = async () => {
			try {
				const data = await sendApiRequest(`/trips/${id}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				setTrip(data.data.trip);
			} catch (err) {
				setAlert(
					err?.message || "Couldn't fetch trip details",
					"error"
				);
				console.error("Error fetching trip details", err);
			} finally {
				setLoading(false);
			}
		};

		getTripDetails();
	}, [id]);

    if (loading) return <LoadingPage />;

    const linkBtn = <LinkBtn txt={"Edit"} link={`/trips/${id}/edit`} />;

    const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<div id="trip-details">
			<Helmet>
				<title>{`Trip to ${trip.destination} - Expense Voyage`}</title>
			</Helmet>

			<PageHead title={`Trip to ${trip.destination}`} headBtn={linkBtn} />

			<div className="trip-contents">
				<div className="trip-basics card grid">
					<TripInfo label="Destination" value={trip.destination} />
					<TripInfo
						label="Budget"
						value={`${user_profile.currency_symbol} ${trip.amount}`}
					/>
					<TripInfo
						label="Start Date"
						value={formatDate(trip.start_date)}
					/>
					<TripInfo
						label="End Date"
						value={formatDate(trip.end_date)}
					/>
				</div>

				{trip.itineraries.length > 0 && (
					<div className="trip-info card">
						<h3 className="title">Itineraries</h3>

						<ul>
							{trip.itineraries.map((itinerary) => (
								<li className="grid" key={itinerary.id}>
									<TripInfo
										label="Name"
										value={itinerary.name}
									/>
									<TripInfo
										label="Amount"
										value={`${user_profile.currency_symbol} ${itinerary.amount}`}
									/>
									<TripInfo
										label="Category"
										value={itinerary.category.name}
									/>
								</li>
							))}
						</ul>
					</div>
				)}

				{trip.expenses.length > 0 && (
					<div className="trip-info card">
						<h3 className="title">Expenses</h3>

						<ul>
							{trip.expenses.map((expense) => (
								<li className="grid" key={expense.id}>
									<TripInfo
										label="Name"
										value={expense.name}
									/>
									<TripInfo
										label="Amount"
										value={expense.amount}
									/>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default TripDetails;
