import React, {
	createContext,
	useState,
	useEffect,
	useContext,
} from "react";

import { sendApiRequest } from "../services/api";

export const NotificationsContext = createContext();

const NotificationsProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([]);
	const [unreadNotifCount, setUnreadNotifCount] = useState(0);

	useEffect(() => {
		const getNotifications = async () => {
			try {
				const data = await sendApiRequest("/notifications", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				console.log(data);

				setNotifications(data.data.notifications);

				setUnreadNotifCount(
					data.data.notifications.filter((n) => !n.read).length
				);
			} catch (error) {
				console.error("Error fetching notifications:", error);
			}
		};

		getNotifications();
	}, []);

	return (
		<NotificationsContext.Provider
			value={{
				notifications,
				unreadNotifCount,
				setNotifications,
				setUnreadNotifCount,
			}}
		>
			{children}
		</NotificationsContext.Provider>
	);
};

export const useNotifications = () => useContext(NotificationsContext);
export default NotificationsProvider;
