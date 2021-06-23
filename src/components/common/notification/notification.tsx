// Dependencies
import React from "react";
import { useSelector } from "react-redux";

// Styles
import "./notification.css";

// Components
import SystemNotify from "./notification-components/system-notify";
import UserNotify from "./notification-components/user-notify";

// Types
import { RootState } from "../../../redux/store";

const Notification = () => {
	const { notifications, userNotifications } = useSelector((state: RootState) => state.notifications);

	return (
		<React.Fragment>
			<div className="system-notifications-wrapper">
				{notifications.map((notify) => {
					return <SystemNotify key={notify.id} {...notify} />;
				})}
			</div>

			<div className="user-notifications-wrapper">
				{userNotifications.map((notify) => {
					return <UserNotify key={notify.id} {...notify} />
				})}
			</div>
		</React.Fragment>
	);
};

export default Notification;
