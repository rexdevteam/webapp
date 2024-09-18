import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		isAuthenticated: false,
		user: null,
		token: null,
	});

	useEffect(() => {
		const token = localStorage.getItem("token");
		const user = JSON.parse(localStorage.getItem("user"));
		if (token && user) {
			setAuth({ isAuthenticated: true, user, token });
		}
	}, []);

	const login = (userData, token) => {
		localStorage.setItem("token", token);
		localStorage.setItem("user", JSON.stringify(userData));
		setAuth({ isAuthenticated: true, user: userData, token });
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setAuth({ isAuthenticated: false, user: null, token: null });
	};

	return (
		<AuthContext.Provider value={{ auth, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;