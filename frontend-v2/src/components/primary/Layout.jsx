import React, { useState } from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	CssBaseline,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../sidebar/Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const handleSidebarToggle = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div>
			<Sidebar
				variant={isMobile ? "temporary" : "permanent"}
				open={isMobile ? sidebarOpen : true}
				onClose={handleSidebarToggle}
			/>
			<main>
				<Header />
				<div className="wrapper">
					{children}
				</div>
			</main>
		</div>
	);
};

export default Layout;
