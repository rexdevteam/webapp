// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import AuthProvider from "./context/AuthContext";
import AlertProvider from "./context/AlertContext"

import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import ProfileEdit from "./pages/profile/ProfileEdit";
import Expenses from "./pages/expenses/Expenses";
import Trips from "./pages/trips/Trips";
import Newtrip from "./pages/tipsform/Newtrip";
import NewTrip from "./pages/trips/NewTrip";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

import AuthenticatedRoute from "./components/auth/AuthenticatedRoute";
import UnprotectedRoute from "./components/auth/UnprotectedRoute";
import AuthLayout from "./components/primary/AuthLayout";

import Alert from "./components/ui/Alert";

const App = () => (
	<AuthProvider>
		<AlertProvider>
			<Router>
				<Alert />
				<Routes>
					<Route
						path="/login"
						element={
							<AuthLayout>
								{" "}
								<Login />{" "}
							</AuthLayout>
						}
					/>
					<Route
						path="/signup"
						element={
							<AuthLayout>
								{" "}
								<SignUp />{" "}
							</AuthLayout>
						}
					/>

					<Route path="/" element={<Navigate to="/dashboard" />} />
					<Route
						path="/dashboard"
						element={<AuthenticatedRoute element={<Dashboard />} />}
					/>

					<Route
						path="/profile"
						element={<AuthenticatedRoute element={<Profile />} />}
					/>
					<Route
						path="/profile/edit"
						element={
							<AuthenticatedRoute element={<ProfileEdit />} />
						}
					/>

					<Route
						path="/expenses"
						element={<AuthenticatedRoute element={<Expenses />} />}
					/>
					<Route
						path="/expenses/new"
						element={<AuthenticatedRoute element={<Expenses />} />}
					/>

					<Route
						path="/trips"
						element={<AuthenticatedRoute element={<Trips />} />}
					/>
					<Route
						path="/trips/n"
						element={<AuthenticatedRoute element={<Newtrip />} />}
					/>
					<Route
						path="/trips/new"
						element={<AuthenticatedRoute element={<NewTrip />} />}
					/>
				</Routes>
			</Router>
		</AlertProvider>
	</AuthProvider>
);

export default App;
