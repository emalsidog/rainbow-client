// Dependencies
import React from "react";

// Styles
import styles from "./spinner.module.css";

const Spinner: React.FC = () => {
	return (
		<div className={styles.loader}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default Spinner;
