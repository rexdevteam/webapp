import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import Menuitems from "./MenuItems.js";
import { useAuth } from "../../context/AuthContext.jsx";

const SidebarItems = () => {
	const { logout } = useAuth();
	const { pathname } = useLocation();
	const pathDirect = pathname;

	return (
		<>
			{Menuitems.map((item) => {
				// {/********SubHeader**********/}
				if (item.subheader) {
					return (
						<li className="nav-title" key={item.subheader}>
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

			<li className="nav-item">
				<a className="flex" onClickCapture={logout} >
					<span className="ico"> </span>
					<span className="name"> {"Sign Out"} </span>
				</a>
			</li>
		</>
	);
};
export default SidebarItems;
