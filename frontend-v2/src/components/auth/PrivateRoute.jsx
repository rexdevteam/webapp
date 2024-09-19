// src/components/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
	const { auth, loading } = useAuth();

	
	if (loading) {
		return <div></div>; // Or a spinner/loading component
	}

	console.log(auth.isAuthenticated)

	return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
