// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/primary/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

import Header from "./components/primary/Header";

const App = () => (
	<Router>
		<Layout>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</Layout>
	</Router>
);

export default App;
