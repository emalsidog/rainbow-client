// Dependencies
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// Actions
import { removeUserNotification } from "../../../../../redux/notifications/actions";

// Styles
import styles from "./user-notify.module.css";

// Components
import ViewProfile from "../../../../common-actions/view-profile";

// Types
import { UserNotificationTypes } from "../../../../../redux/notifications/types";

const UserNotify: React.FC<UserNotificationTypes> = (props) => {
	const { id } = props;

	const [exit, setExit] = useState<boolean>(false);
	const [timeoutId, setTimeoutId] = useState<number>(0);

	const dispatch = useDispatch();

	const handleCloseNotify = () => {
		setExit(true);
		clearTimeout(timeoutId);
		window.setTimeout(() => {
			id && dispatch(removeUserNotification(id));
		}, 400);
	};

	useEffect(() => {
		new Audio("/assets/sounds/notify.mp3").play();
		const timeoutId: number = window.setTimeout(handleCloseNotify, 10000);
		setTimeoutId(timeoutId);

		// eslint-disable-next-line
	}, []);


	let title: string;
	let message: string;
	let actions: JSX.Element[];

	switch (props.type) {
		case "FRIEND_REQUEST": {
			const { displayName, profileId } = props.data;
			
			title = "Friend request";
			message = `A new friend request from ${displayName}`;

			actions = [
				<ViewProfile key={0} callback={handleCloseNotify} profileId={profileId} />
			];
			break;
		}
		case "FRIEND_REQUEST_ACCEPTED": {
			const { displayName } = props.data;

			title = "Request accepted";
			message = `${displayName} accepted your friend request!`;

			actions = [];
			break;
		}
		default: {
			title = "";
			message = "";
			actions = [];
		}
	}

	return (
		<div className={`${styles.wrapper} ${exit ? styles.exit : ""}`}>
			<div className={styles.header}>
				<div>{title}</div>
				<button onClick={handleCloseNotify} className="btn-transperent">
					<i style={{ color: "gray" }} className="fas fa-times"></i>
				</button>
			</div>
			<div className={styles.body}>{message}</div>
			<div className={styles.footer}>{actions}</div>
		</div>
	);
};

export default UserNotify;