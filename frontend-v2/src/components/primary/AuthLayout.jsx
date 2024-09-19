import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import "../../assets/css/form.css"
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";

const AuthLayout = ({ children }) => {
	const { auth, loading, user } = useAuth();
	const { setAlert, persistAlert } = useAlert();

	console.log(loading);

	if (loading) {
		return <div></div>; // Or a spinner/loading component
	}

	if (auth.isAuthenticated) {
		persistAlert(`Welcome back ${user?.firstname}`, "success");
		return <Navigate to="/" />;
	}

	return (
		<div>
			<main style={{ margin: "0px" }}>
				<div className="wrapper flex flexCenter">
					<div id="auth" className="card form-wrapper">
						{children}
					</div>
				</div>
			</main>
		</div>
	);
};

export default AuthLayout;
