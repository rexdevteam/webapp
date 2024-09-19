// src/components/Sidebar.jsx
import React from "react";
import {
    useMediaQuery,
	Box,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import {
	Dashboard,
	DirectionsCar,
	Receipt,
	Person,
	ExitToApp,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = ({ variant, open, onClose }) => {
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
	const sidebarWidth = "270px";

	// Custom CSS for short scrollbar
	const scrollbarStyles = {
		"&::-webkit-scrollbar": {
			width: "7px",
		},
		"&::-webkit-scrollbar-thumb": {
			backgroundColor: "#eff2f7",
			borderRadius: "15px",
		},
	};

    if (lgUp) {
        return (
			<Box
				sx={{
					width: sidebarWidth,
					flexShrink: 0,
				}}
			>
				{/* Sidebar for desktop */}
				<Drawer variant={variant} open={open} onClose={onClose}>
					<List>
						<ListItem button component={Link} to="/">
							<ListItemIcon>
								<Dashboard />
							</ListItemIcon>
							<ListItemText primary="Dashboard" />
						</ListItem>
						<ListItem button component={Link} to="/trips">
							<ListItemIcon>
								<DirectionsCar />
							</ListItemIcon>
							<ListItemText primary="Trips" />
						</ListItem>
						<ListItem button component={Link} to="/expenses">
							<ListItemIcon>
								<Receipt />
							</ListItemIcon>
							<ListItemText primary="Expenses" />
						</ListItem>
						<ListItem button component={Link} to="/profile">
							<ListItemIcon>
								<Person />
							</ListItemIcon>
							<ListItemText primary="Profile" />
						</ListItem>
						<ListItem button component={Link} to="/signout">
							<ListItemIcon>
								<ExitToApp />
							</ListItemIcon>
							<ListItemText primary="Sign Out" />
						</ListItem>
					</List>
				</Drawer>
			</Box>
		);
    }

};

export default Sidebar;
