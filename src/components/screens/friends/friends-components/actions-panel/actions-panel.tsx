// Dependencies
import React from "react";
import { NavLink } from "react-router-dom";

// Styles
import styles from "./actions-panel.module.css";

// Types
interface ActionsPanelProps {
    isVisible: boolean;
}

const ActionsPanel: React.FC<ActionsPanelProps> = ({ isVisible }) => {
    let classNames = `${styles.wrapper} `;

    if (!isVisible) {
        classNames += styles.exit
    };

	return (
		<div className={classNames}>
			<NavLink className={styles.link} activeClassName={styles.activeLink} to="/friends">
                <i className="fas fa-users" />
                <span className={styles.actionText}>Friends</span>
            </NavLink>
			<NavLink className={styles.link} activeClassName={styles.activeLink} to="/people/search">
                <i className="fas fa-search" />
                <span className={styles.actionText}>Search</span>
            </NavLink>
            <NavLink className={styles.link} activeClassName={styles.activeLink} to="/requests">
                <i className="fas fa-user-clock" />
                <span className={styles.actionText}>Requests</span>
            </NavLink>
		</div>
	);
};

export default ActionsPanel;
