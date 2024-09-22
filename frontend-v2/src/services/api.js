// src/services/api.js
import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:1900/api",
});

// Function to set the authorization token
export const setAuthToken = (token) => {
	if (token) {
		API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete API.defaults.headers.common["Authorization"];
	}
};

export const sendApiRequest = async (endpoint, options = {}) => {
	try {
		let headers = options.headers
		headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;

		const response = await API.request({
			url: endpoint,
			method: options.method || "GET",
			headers: options.headers,
			data: options.body,
		});

		console.log(response.data);

		return response.data;
	} catch (err) {
		console.error("Error sending request:", err);

		const errorMessage = err.response?.data?.message || err?.message || "Error reaching the server. Please try again.";;
		throw new Error(errorMessage); // Throw the API error message
	}
};


export const fetchCategories = async () => {
	try {
		const data = await sendApiRequest("/itinerary-cats", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		console.log(data.data);

		return data.data;
	} catch (error) {
		console.error("Error fetching categories:", error);
		throw error;
	}
};

export const fetchTrips = async () => {
	try {
		const data = await sendApiRequest("/trips", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return data.data;
	} catch (error) {
		console.error("Error fetching categories:", error);
		throw error;
	}
};

export const fetchTrip = async (id) => {
	try {
		const data = await sendApiRequest(`/trips/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return data.data;
	} catch (error) {
		console.error("Error fetching Trip:", error);
		throw error;
	}
};