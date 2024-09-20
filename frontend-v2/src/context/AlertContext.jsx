import React, { createContext, useState, useEffect, useContext, useCallback } from "react";

export const AlertContext = createContext();

const AlertProvider = ({ children }) => {
	const [alert, setAlertState] = useState({ text: "", type: "" });

	// Function to set an alert that disappears after 4 seconds
	const setAlert = useCallback((text, type) => {
		setAlertState({ text, type });
		setTimeout(() => {
			setAlertState({ text: "", type: "" });
		}, 4000);
	}, []);

	// Function to persist alert without auto-hide
	const persistAlert = useCallback((text, type) => {
		// Clear current alert, then set a new one
		setAlertState({ text: "", type: "" });
		setTimeout(() => {
			setAlertState({ text, type });
		}, 50); // Short delay to ensure state change
	}, []);

	return (
		<AlertContext.Provider value={{ alert, setAlert, persistAlert }}>
			{children}
		</AlertContext.Provider>
	);
};

export const useAlert = () => useContext(AlertContext);
export default AlertProvider;
