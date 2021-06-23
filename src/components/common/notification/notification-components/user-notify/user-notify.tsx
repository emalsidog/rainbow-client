// Dependencies
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Actions
import { removeUserNotification } from "../../../../../redux/notifications/actions";

// Styles
import styles from "./user-notify.module.css";

// Types
import { UserNotificationTypes } from "../../../../../redux/notifications/types";

const UserNotify: React.FC<UserNotificationTypes> = (props) => {
	const { id } = props;

	const [exit, setExit] = useState<boolean>(false);
	const [timeoutId, setTimeoutId] = useState<number>(0);

	const history = useHistory();
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
			
			const handleViewProfile = () => {
				handleCloseNotify();
				history.push(`/${profileId}`);
			}

			const acceptRequest = () => {
				handleCloseNotify();
			}

			title = "Friend request";
			message = `A new friend request from ${displayName}`;

			actions = [
				<button 
					key={0} 
					className="btn btn-primary"
					onClick={acceptRequest} 
				>
					Accept
				</button>,
				<button
					key={1}
					className="btn btn-secondary"
					onClick={handleViewProfile}
				>
					View profile
				</button>
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