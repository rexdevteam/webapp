import {
	Dashboard,
	DirectionsCar,
	Receipt,
	Person,
	ExitToApp,
} from "@mui/icons-material";

import { uniqueId } from "lodash";

const Menuitems = [
	{
		navlabel: true,
		subheader: "Home",
	},

	{
		id: uniqueId(),
		title: "Dashboard",
		icon: Dashboard,
		href: "/dashboard",
	},
	{
		navlabel: true,
		subheader: "Components",
	},
	{
		id: uniqueId(),
		title: "Trips",
		icon: DirectionsCar,
		href: "/trips",
	},
	{
		id: uniqueId(),
		title: "Expenses",
		icon: Receipt,
		href: "/expenses",
	},
	{
		navlabel: true,
		subheader: "Extra",
	},
	{
		id: uniqueId(),
		title: "Profile",
		icon: Person,
		href: "/profile",
	},

	{
		navlabel: true,
		subheader: "Auth",
	},
	{
		id: uniqueId(),
		title: "Sign Out",
		icon: ExitToApp,
		href: "/signout",
	},
];

export default Menuitems;
