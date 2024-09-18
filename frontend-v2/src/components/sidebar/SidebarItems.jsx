import React from "react";
import Menuitems from "./MenuItems.js";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
// import NavItem from "./NavItem";
// import NavGroup from "./NavGroup/NavGroup";

const SidebarItems = () => {
	const { pathname } = useLocation();
	const pathDirect = pathname;

	return (
		<>
			{Menuitems.map((item) => {
				// {/********SubHeader**********/}
				if (item.subheader) {
					return (
						<li
							className="nav-title"
							key={item.subheader}
						>
							{item.subheader}
						</li>
					);

					// {/********If Sub Menu**********/}
					/* eslint no-else-return: "off" */
				} else {
					return (
						<li className="nav-item" key={item.id}>
							<Link to={item.href} className="flex">
								<span className="ico"> </span>
								<span className="name"> {item.title} </span>
							</Link>
						</li>
					);
				}
			})}
		</>
	);
};
export default SidebarItems;
