import React from 'react'
import SidebarItems from './SidebarItems.jsx';

const Sidebar = () => {
    return (
		<div className="sidebar">
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
}

export default Sidebar