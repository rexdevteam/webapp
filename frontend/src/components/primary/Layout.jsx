// src/components/Layout.jsx
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

import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const handleSidebarToggle = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div>
			<CssBaseline />
			<AppBar position="fixed">
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={handleSidebarToggle}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6">My Dashboard</Typography>
				</Toolbar>
			</AppBar>
			
            <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />
			
            <main style={{ marginTop: 64, padding: 16 }}>
                {children}
            </main>
		</div>
	);
};

export default Layout;
