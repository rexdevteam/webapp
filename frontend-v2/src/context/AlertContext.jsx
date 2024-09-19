import React, { createContext, useState, useEffect, useContext, useCallback } from "react";

export const AlertContext = createContext();

const AlertProvider = ({ children }) => {
	const [alert, setAlertState] = useState({ text: "", type: "" });

    const setAlert = useCallback((text, type) => {
		setAlertState({ text, type });
		setTimeout(() => {
			setAlertState({ text: "", type: "" });
		}, 4000); // Adjust the timeout duration as needed
	}, []);

	const persistAlert = useCallback((text, type) => {
		setAlertState({ text, type });
	}, []);

	return (
		<AlertContext.Provider value={{ alert, setAlert, persistAlert }}>
			{children}
		</AlertContext.Provider>
	);
};

export const useAlert = () => useContext(AlertContext);
export default AlertProvider;
