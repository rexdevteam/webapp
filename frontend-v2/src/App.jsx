// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import AuthProvider from "./context/AuthContext";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Expenses from "./pages/expenses/Expenses.Jsx";
import Trips from "./pages/trips/Trips";
import Login from "./pages/auth/Login";
import AuthenticatedRoute from "./components/auth/AuthenticatedRoute";

const App = () => (
	<AuthProvider>
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={ <Navigate to="/dashboard" /> } />

				<Route path="/dashboard" element={ <AuthenticatedRoute element={<Dashboard />} /> } />
				<Route path="/profile" element={  <AuthenticatedRoute element={<Profile />} />  } />
				
				<Route path="/expenses" element={  <AuthenticatedRoute element={<Expenses />} />  } />
				<Route path="/expenses/new" element={  <AuthenticatedRoute element={<Expenses />} />  } />

				<Route path="/trips" element={  <AuthenticatedRoute element={<Trips />} />  } />
				<Route path="/trips/new" element={  <AuthenticatedRoute element={<Trips />} />  } />
			</Routes>
		</Router>
	</AuthProvider>
);

export default App;
