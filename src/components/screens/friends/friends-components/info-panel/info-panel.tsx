// Dependencies
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

// Selectors
import { selectUser } from "../../../../../redux/users/selectors";

// Utils
import { formatDate } from "../../../../utils/format-date";

// Styles
import styles from "./info-panel.module.css";

// Types
interface InfoPanelProps {
	isVisible: boolean | null;
	onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = (props) => {
	const { isVisible, onClose } = props;

	const user = useSelector(selectUser);

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
				<img src={user.avatar} />
				<div className={styles.name}>Valeriia Sushchenko</div>
				<div className={styles.bio}>Graphic Designer</div>

				<button onClick={onClose} className="btn-transperent">
					<i style={{ color: "white" }} className="fas fa-times"></i>
				</button>
			</div>

			<hr />

			<div className={styles.wrapper}>
				<div className={styles.infoItem}>
					<div>prolohcka</div>
					<div className={styles.infoItemLabel}>Profile ID</div>
				</div>
				<div className={styles.infoItem}>
					<div>{formatDate(user.birthday, "BIRTHDAY")}</div>
					<div className={styles.infoItemLabel}>Birthday</div>
				</div>
				<div className={styles.infoItem}>
					<div>{formatDate(user.registrationDate, "REGULAR")}</div>
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
