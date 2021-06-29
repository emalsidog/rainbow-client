// Dependencies
import React, { forwardRef } from "react";

// Styles
import styles from "./people-card.module.css";

// Types
interface PeopleCardProps {
	openInfoPanel: (id: string) => void;

	_id: string;
	givenName: string;
	familyName: string;
	avatar: string;
}

const PeopleCard = forwardRef<HTMLDivElement, PeopleCardProps>(
	(props, ref) => {
	const { openInfoPanel, givenName, familyName, avatar, _id } = props;
		
	return (
		<article ref={ref} onClick={() => openInfoPanel(_id)} className={styles.card}>
			<div className={styles.header}>
				<img src={avatar} alt="" />
			</div>
			<div className={styles.name}>{`${givenName} ${familyName}`}</div>
		</article>
	);
});

export default PeopleCard;
