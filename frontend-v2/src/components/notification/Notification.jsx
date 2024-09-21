import React, { useState, useEffect } from "react";

import NotificationView from "./NotificationView";
import NotifIco from "./NotifIco";

const Notification = () => {
	const [isOverlayVisible, setOverlayVisible] = useState(false);

	const toggleOverlay = () => {
		setOverlayVisible(!isOverlayVisible);
	};

	return (
		<div className="notification">
			<NotifIco onClick={toggleOverlay} />
			<NotificationView
				isVisible={isOverlayVisible}
				onClose={toggleOverlay}
			/>
		</div>
	);
};

export default Notification;
