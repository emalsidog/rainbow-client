// Dependencies
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

// Selectors
import { selectUser } from "../../../../../redux/user/selector";

// Utils
import { formatDate } from "../../../../utils/format-date";

// Hooks
import { useFriendshipStatus } from "../../../../../hocs/useFriendshipStatus";

// Styles
import styles from "./info-panel.module.css";

// Components
import DisplayActions from "../../../../common-actions/display-actions";
import DisplayRole from "../../../../common/display-role";

// Types
import { initialUser, User } from "../../../../../redux/common-types";

interface InfoPanelProps {
	idToDisplay: string;
	users: User[];

	isVisible: boolean | null;
	onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = (props) => {
	const { idToDisplay, users, isVisible, onClose } = props;

	const [user, setUser] = useState<User>(initialUser);

	const currentUser = useSelector(selectUser);

	const ref = useRef<HTMLDivElement>(null);
	const friendshipStatus = useFriendshipStatus(currentUser, user);

	useEffect(() => {
		const foundedUser = users.find(({ _id }) => _id === idToDisplay);

		if (foundedUser) {
			setUser(foundedUser);
		}
	}, [users, idToDisplay]);

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

	const { _id, avatar, bio, birthday,	familyName, givenName, profileId, registrationDate, role } = user;

	if (isVisible === null) return null;
	return (
		<div
			ref={ref}
			className={`${styles.infoPanel} ${isVisible ? "" : styles.exit}`}
		>
			<div className={`${styles.header} ${styles.wrapper}`}>
				<img src={avatar} alt="" />
				<div className={styles.name}>
					{`${givenName} ${familyName}`}
					<DisplayRole role={role} />
				</div>
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
				<DisplayActions
					friendshipStatus={friendshipStatus}
					userId={_id}
					userProfileId={profileId}
				/>
			</div>
		</div>
	);
};

export default InfoPanel;
