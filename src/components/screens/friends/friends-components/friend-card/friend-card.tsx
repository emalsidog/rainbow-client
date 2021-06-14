// Dependencies
import React from "react";
import { useSelector } from "react-redux";

// Selectors
import { selectUser } from "../../../../../redux/user/selector";

// Styles
import styles from "./friend-card.module.css";

// Types
interface FriendCardProps {
	openInfoPanel: () => void;
}

const FriendCard: React.FC<FriendCardProps> = (props) => {
	const { openInfoPanel } = props;

	const user = useSelector(selectUser);

	return (
		<article onClick={openInfoPanel} className={styles.card}>
			<div className={styles.header}>
				<img src={user.avatar} />
			</div>
			<div className={styles.name}>Valeriia Sushchenko</div>
		</article>
	);
};

export default FriendCard;
