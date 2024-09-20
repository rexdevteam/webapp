import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		isAuthenticated: false,
		user_profile: null,
		access_token: null,
	});

	const [loading, setLoading] = useState(true);
	const [user_profile, setUserProfile] = useState(null); // Initialize as null
	const [access_token, setToken] = useState(null); // Initialize as null

	useEffect(() => {
		const access_token = localStorage.getItem("access_token");
		const user_profile = JSON.parse(localStorage.getItem("user_profile"));
		if (access_token && user_profile) {
			setAuth({ isAuthenticated: true, user_profile, access_token });
			setUserProfile(user_profile);
			setToken(access_token);
		} else {
			setAuth({ isAuthenticated: false, user_profile: null, access_token: null });
		}

		setLoading(false);

		console.log(user_profile);
	}, []);

	const login = (userData, access_token) => {
		localStorage.setItem("access_token", access_token);
		localStorage.setItem("user_profile", JSON.stringify(userData));
		setAuth({ isAuthenticated: true, user_profile: userData, access_token });
		setUserProfile(userData);
		setToken(access_token);
	};

	const logout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("user_profile");
		setAuth({ isAuthenticated: false, user_profile: null, access_token: null });
		setUserProfile(null);
		setToken(null);
	};

	return (
		<AuthContext.Provider
			value={{ auth, loading, user_profile, access_token, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;