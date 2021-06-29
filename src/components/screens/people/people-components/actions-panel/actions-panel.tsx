// Dependencies
import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// Selectors
import { selectRequestsCounter } from "../../../../../redux/user/selector";

// Styles
import styles from "./actions-panel.module.css";

// Types
const ActionsPanel: React.FC = () => {
	const [isActionsVisible, setIsActionsVisible] = useState<boolean>(true);
	const oldScrollValue = useRef<number>(0);

	const requestsCount = useSelector(selectRequestsCounter);

	useEffect(() => {
		document.addEventListener("scroll", handleScroll);
		return () => document.removeEventListener("scroll", handleScroll);
	}, []);

	const handleScroll = () => {
		const scroll = document.documentElement.scrollTop;

		if (scroll > oldScrollValue.current) {
			setIsActionsVisible(false);
		} else {
			setIsActionsVisible(true);
		}
		oldScrollValue.current = scroll;
	};

	let classNames = `${styles.wrapper} `;

	if (!isActionsVisible) {
		classNames += styles.exit;
	}

	return (
		<div className={classNames}>
			<NavLink
				className={styles.link}
				activeClassName={styles.activeLink}
				to="/people/friends"
			>
				<i className="fas fa-users" />
				<span className={styles.actionText}>Friends</span>
			</NavLink>
			<NavLink
				className={styles.link}
				activeClassName={styles.activeLink}
				to="/people/search"
			>
				<i className="fas fa-search" />
				<span className={styles.actionText}>Search</span>
			</NavLink>
			<NavLink
				className={styles.link}
				activeClassName={styles.activeLink}
				to="/people/requests"
				title={
					requestsCount > 0
						? `You have ${requestsCount} requests`
						: undefined
				}
			>
				<i className="fas fa-user-clock" />
				<span className={styles.actionText}>Requests</span>
				{requestsCount > 0 && (
					<span className={styles.requestsCounter}>
						{requestsCount > 99
							? ":P"
							: requestsCount > 0
							? requestsCount
							: null}
					</span>
				)}
			</NavLink>
		</div>
	);
};

export default ActionsPanel;
