import React from "react";

import { useNotifications } from "../../context/NotificationsContext";
import bell from "../../assets/img/bell.svg";

const NotifIco = ({ onClick }) => {
	const { unreadNotifCount } = useNotifications();

	return (
		<div className="notif-ico" onClick={onClick}>
				{unreadNotifCount > 0 && (
					<div className="count">{unreadNotifCount}</div>
				)}
				<div className="fitImg">
					<img src={bell} alt="" />
				</div>
		</div>
	);
};

export default NotifIco;
