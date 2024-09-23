import React, { useState, useEffect, useRef } from "react";
import { useTheme, useMediaQuery, } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const sidebarRef = useRef(null); // Ref for sidebar to detect outside clicks
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const handleSidebarToggle = () => {
		setSidebarOpen(!sidebarOpen);
	};

	// Effect to close sidebar when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			// Check if the click is outside the sidebar
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target)
			) {
				setSidebarOpen(false); // Close the sidebar
			}
		};

		// Add event listener when sidebar is active
		if (sidebarOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		// Cleanup event listener when the sidebar closes or component unmounts
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [sidebarOpen]);

	return (
		<div>
			<Sidebar
				isOpen={sidebarOpen}
				sidebarRef={sidebarRef}
				handleSidebarToggle={handleSidebarToggle}
			/>
			<main>
				<Header handleSidebarToggle={handleSidebarToggle} />
				<div className="wrapper">{children}</div>
			</main>
		</div>
	);
};

export default Layout;
