// Dependencies
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

// Selectors
import { selectUsers } from "../../../../../redux/users/selectors";

// Utils
import { formatDate } from "../../../../utils/format-date";

// Styles
import styles from "./info-panel.module.css";

// Components
import AddToFriends from "../../../../common-actions/add-friend";
import ViewProfile from "../../../../common-actions/view-profile";
import AcceptRequest from "../../../../common-actions/accept-request";
import DeclineRequest from "../../../../common-actions/decline-request";
import RemoveFromFriends from "../../../../common-actions/remove-from-friends";
import CancelRequest from "../../../../common-actions/cancel-request";

// Types
import { initialUser, User } from "../../../../../redux/common-types";
import { selectUser } from "../../../../../redux/user/selector";

interface InfoPanelProps {
	idToDisplay: string;

	isVisible: boolean | null;
	onClose: () => void;
}

type FriendshipStatus = "FRIENDS" | "PENDING_FOR_USER_RESPONSE" | "PENDING_FOR_YOUR_RESPONSE" | "NONE";

const InfoPanel: React.FC<InfoPanelProps> = (props) => {
	const { idToDisplay, isVisible, onClose } = props;
	
	const [user, setUser] = useState<User>(initialUser);
	const [friendshipStatus, setFriendshipStatus] = useState<FriendshipStatus>("NONE");

	const currentUser = useSelector(selectUser);
	const users = useSelector(selectUsers);

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const foundedUser = users.find(({ _id }) => _id === idToDisplay);
		const { _id, friendRequests, friends } = currentUser;

		if (foundedUser) {
			setUser(foundedUser);

			if (friendRequests.includes(foundedUser._id)) {
				setFriendshipStatus("PENDING_FOR_YOUR_RESPONSE")
				return;
			}
			
			if (foundedUser.friendRequests.includes(_id)) {
				setFriendshipStatus("PENDING_FOR_USER_RESPONSE")
				return;
			}

			if (friends.includes(foundedUser._id)) {
				setFriendshipStatus("FRIENDS")
				return;
			}
			setFriendshipStatus("NONE")
		}
	}, [users, idToDisplay, currentUser])
	
	// Listen for events to close panel
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscQuit);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscQuit);
		};
	});

	// Handle click outside
	const handleClickOutside = (e: any): void => {
		if (ref.current && !ref.current.contains(e.target)) {
			onClose();
		}
	};

	// Handle press ESC
	const handleEscQuit = (e: any): void => {
		if (e.key === "Escape") {
			onClose();
		}
	};

	const { _id, avatar, bio, birthday, familyName, givenName, profileId, registrationDate } = user

	let actions: JSX.Element[] = [];
	
	switch (friendshipStatus) {
		case "FRIENDS": {
			actions = [
				<button key={0} className="btn btn-primary">
					Write a message
				</button>,
				<ViewProfile key={1} profileId={profileId} />,
				<RemoveFromFriends key={2} id={_id} />,
			];
			break;
		}
		case "PENDING_FOR_USER_RESPONSE": {
			actions = [
				<ViewProfile key={0} profileId={profileId} />,
				<CancelRequest key={1} id={_id} />,
			];
			break;
		}
		case "PENDING_FOR_YOUR_RESPONSE": {
			actions = [
				<ViewProfile key={0} profileId={profileId} />,
				<AcceptRequest key={1} id={_id} />,
				<DeclineRequest key={2} id={_id} />
			];
			break;
		}
		case "NONE": {
			actions = [
				<AddToFriends key={0} profileId={profileId} />,
				<ViewProfile key={1} profileId={profileId}/>
			];
			break;
		}
	}

	if (isVisible === null) return null;
	return (
		<div
			ref={ref}
			className={`${styles.infoPanel} ${isVisible ? "" : styles.exit}`}
		>
			<div className={`${styles.header} ${styles.wrapper}`}>
				<img src={avatar} alt="" />
				<div
					className={styles.name}
				>{`${givenName} ${familyName}`}</div>
				<div className={styles.bio}>{bio}</div>

				<button onClick={onClose} className="btn-transperent">
					<i style={{ color: "white" }} className="fas fa-times"></i>
				</button>
			</div>

			<hr />

			<div className={`${styles.wrapper} ${styles.mainBlock}`}>
				<div className={styles.infoItem}>
					<div>{profileId}</div>
					<div className={styles.infoItemLabel}>Profile ID</div>
				</div>
				<div className={styles.infoItem}>
					<div>
						{formatDate(birthday, "BIRTHDAY") || "Not specified"}
					</div>
					<div className={styles.infoItemLabel}>Birthday</div>
				</div>
				<div className={styles.infoItem}>
					<div>
						{formatDate(registrationDate, "REGULAR") ||
							"Not specified"}
					</div>
					<div className={styles.infoItemLabel}>Member since</div>
				</div>
			</div>

			<div className={`${styles.footer} ${styles.wrapper}`}>
				{actions}
			</div>
		</div>
	);
};

export default InfoPanel;
