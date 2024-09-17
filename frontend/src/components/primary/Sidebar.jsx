// src/components/Sidebar.jsx
import React from "react";
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	IconButton,
} from "@mui/material";
import {
	Dashboard,
	DirectionsCar,
	Receipt,
	Person,
	ExitToApp,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = ({ open, onClose }) => (
	<Drawer variant="temporary" open={open} onClose={onClose}>
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
);

export default Sidebar;
