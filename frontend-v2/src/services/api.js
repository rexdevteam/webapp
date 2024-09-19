// src/services/api.js
import axios from "axios";
import { mockTrips } from "./data.js";

const API = axios.create({
	baseURL: "https://expense-voyage-api.onrender.com/api",
});

export const fetchData = async (endpoint) => {
	// Temporarily return mock data
	if (endpoint === "/trips") {
		return new Promise((resolve) => {
			setTimeout(() => resolve(mockTrips), 1000); // Simulate network delay
		});
	}

	// Uncomment the following lines when the API is ready
	// const response = await API.get(endpoint);
	// return response.data;
};
