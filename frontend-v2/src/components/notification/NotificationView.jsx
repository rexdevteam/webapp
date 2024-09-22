import React from "react";
import CloseIcon from "@mui/icons-material/Close";

import { useNotifications } from "../../context/NotificationsContext";
import Btn from "../ui/Btn";

const NotificationView = ({ isVisible, onClose }) => {
	const { notifications, setNotifications, setUnreadNotifCount } =
		useNotifications();

	const markAsRead = () => {
		const updatedNotifications = notifications.map((n) => ({
			...n,
			read: true,
		}));
		setNotifications(updatedNotifications);
		setUnreadNotifCount(0);
	};

	return (
		isVisible && (
			<div className="notification-view card">
				<div className="notif-header flex flex-space-between">
					<span>Notifications</span>
					<div className="close-notif" onClick={onClose}>
						<CloseIcon sx={{ fontSize: 21 }} />
					</div>
				</div>

				<ul>
					{notifications.map((notification, index) => (
						<li
							key={index}
							className={notification.read ? "read" : "unread"}
						>
							{notification.body}
						</li>
					))}
				</ul>

				<Btn
					txt={"Mark all as read"}
					type="button"
					handleClick={markAsRead}
				/>
			</div>
		)
	);
};

export default NotificationView;
