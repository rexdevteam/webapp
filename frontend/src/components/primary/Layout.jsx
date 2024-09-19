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
	const [sidebarOpen, setSidebarOpen] = useState(true);
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
					{isMobile && (
						<IconButton
							edge="start"
							color="inherit"
							aria-label="menu"
							onClick={handleSidebarToggle}
						>
							<MenuIcon />
						</IconButton>
					)}
					<Typography variant="h6">My Dashboard</Typography>
				</Toolbar>
			</AppBar>
			<Sidebar
				variant={isMobile ? "temporary" : "permanent"}
				open={isMobile ? sidebarOpen : true}
				onClose={handleSidebarToggle}
			/>
			<main
				style={{
					marginTop: 64,
					padding: 16,
					marginLeft: isMobile ? 0 : 240,
				}}
			>
				{children}
			</main>
		</div>
	);
};

export default Layout;
