// src/services/api.js
import axios from "axios";

const API = axios.create({
	baseURL: "https://api.example.com/api",
});

export const fetchData = async () => {
	const response = await API.get("/data");
	return response.data;
};
