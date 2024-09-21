import React from 'react'

import { useNotifications } from '../../context/NotificationsContext';
import Btn from './Btn';

const Notification = ({ isVisible, onClose }) => {
    const {
		notifications,
		setNotifications,
		setUnreadNotifCount,
	} = useNotifications();

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
				<div className="overlay-header">
					<span>Notifications</span>
					<button onClick={onClose}>Close</button>
				</div>

				<ul>
					{notifications.map((notification, index) => (
						<li
							key={index}
							className={notification.read ? "read" : "unread"}
						>
							{notification.message}
						</li>
					))}
				</ul>
			</div>
		)
	);
}

export default Notification