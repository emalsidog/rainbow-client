// Dependencies
import React from "react";
import { useSelector } from "react-redux";

// Styles
import "./notification.css";

// Styles
import "./notification.css";

// Components
import Notify from "./notification-components/notify";

// Types
import { RootState } from "../../../redux/store";

const Notification = () => {
	const { notifications } = useSelector((state: RootState) => state.notifications);

	return (
		<div className="notification-wrapper">
			{notifications.map((notify) => {
				return <Notify key={notify.id} {...notify} />;
			})}
		</div>
	);
};

export default Notification;