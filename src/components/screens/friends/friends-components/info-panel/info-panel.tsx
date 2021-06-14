// Dependencies
import React, { useEffect, useRef } from "react";

// Selectors
import { User } from "../../../../../redux/users/types";

// Utils
import { formatDate } from "../../../../utils/format-date";

// Styles
import styles from "./info-panel.module.css";

// Types
interface InfoPanelProps {
	user: User;

	isVisible: boolean | null;
	onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = (props) => {
	const { user, isVisible, onClose } = props;
	const { avatar, givenName, familyName, bio, profileId, birthday, registrationDate } = user;

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscQuit);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscQuit);
		};
	});

	const handleClickOutside = (e: any) => {
		if (ref.current && !ref.current.contains(e.target)) {
			onClose();
		}
	};

	const handleEscQuit = (e: any) => {
		if (e.key === "Escape") {
			onClose();
		}
	};

	if (isVisible === null) return null;
	return (
		<div
			ref={ref}
			className={`${styles.infoPanel} ${isVisible ? "" : styles.exit}`}
		>
			<div className={`${styles.header} ${styles.wrapper}`}>
				<img src={avatar} alt="" />
				<div className={styles.name}>{`${givenName} ${familyName}`}</div>
				<div className={styles.bio}>{bio}</div>

				<button onClick={onClose} className="btn-transperent">
					<i style={{ color: "white" }} className="fas fa-times"></i>
				</button>
			</div>

			<hr />

			<div className={styles.wrapper}>
				<div className={styles.infoItem}>
					<div>{profileId}</div>
					<div className={styles.infoItemLabel}>Profile ID</div>
				</div>
				<div className={styles.infoItem}>
					<div>{formatDate(birthday, "BIRTHDAY") || "Not specified"}</div>
					<div className={styles.infoItemLabel}>Birthday</div>
				</div>
				<div className={styles.infoItem}>
					<div>{formatDate(registrationDate, "REGULAR") || "Not specified"}</div>
					<div className={styles.infoItemLabel}>Member since</div>
				</div>
			</div>

			<div className={`${styles.footer} ${styles.wrapper}`}>
				<button className="btn btn-primary">Add to friends</button>
				<button className="btn btn-primary">View profile</button>
			</div>
		</div>
	);
};

export default InfoPanel;
