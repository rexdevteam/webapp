import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App.jsx";


const theme = createTheme({
	palette: {
		primary: {
			main: "#1976d2",
		},
		secondary: {
			main: "#dc004e",
		},
	},
});

const root = createRoot(document.getElementById("root"));
root.render(
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>
);