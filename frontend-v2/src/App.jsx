// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/primary/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Expenses from "./pages/expenses/Expenses.Jsx";
import Trips from "./pages/trips/Trips";

const App = () => (
	<Router>
		<Layout>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/expenses" element={<Expenses />} />
				<Route path="/trips" element={<Trips />} />
			</Routes>
		</Layout>
	</Router>
);

export default App;
