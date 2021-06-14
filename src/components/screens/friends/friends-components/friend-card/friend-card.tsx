// Dependencies
import React from "react";

// Styles
import styles from "./friend-card.module.css";

// Types
interface FriendCardProps {
	openInfoPanel: (id: string) => void;

	_id: string;
	givenName: string;
	familyName: string;
	avatar: string;
}

const FriendCard: React.FC<FriendCardProps> = (props) => {
	const { openInfoPanel, givenName, familyName, avatar, _id } = props;

	return (
		<article onClick={() => openInfoPanel(_id)} className={styles.card}>
			<div className={styles.header}>
				<img src={avatar} alt="" />
			</div>
			<div className={styles.name}>{`${givenName} ${familyName}`}</div>
		</article>
	);
};

export default FriendCard;
