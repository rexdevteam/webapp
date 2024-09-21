import React from 'react'
import SidebarItems from './SidebarItems.jsx';
import CloseIcon from "@mui/icons-material/Close";

const Sidebar = ({ isOpen, sidebarRef, handleSidebarToggle }) => {
	return (
		<div ref={sidebarRef} className={`sidebar ${isOpen ? "active" : ""}`}>
			<div
				className="hamburger-btn flex flexCenter"
				onClick={handleSidebarToggle}
			>
				<div className="ico hamburger flex flexCenter">
					<CloseIcon sx={{ fontSize: 50 }} />
				</div>
			</div>

			<div className="sidebar-header">
				<a href="" className="sidebar-brand" to="/">
					<h1 className="brand" to="/">
						Expense Voyage
					</h1>
				</a>
			</div>

			<div className="sidebar-nav">
				<ul className="side-content">
					<SidebarItems />
				</ul>
			</div>

			<div className="sidebar-footer"></div>
		</div>
	);
};

export default Sidebar