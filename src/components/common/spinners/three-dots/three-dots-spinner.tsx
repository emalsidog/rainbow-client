// Dependencies
import React from "react";

// Styles
import styles from "./three-dots-spinner.module.css";

// Types
interface ThreeDotsProps {
	loadingText?: string;
}

const ThreeDots: React.FC<ThreeDotsProps> = ({ loadingText = "Loading" }) => {
	return (
		<span className={styles.loading}>
			{loadingText}
			<span>.</span>
			<span>.</span>
			<span>.</span>
		</span>
	);
};

export default ThreeDots;
