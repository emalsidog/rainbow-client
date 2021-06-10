// Dependenices
import React from "react";

// Styles
import styles from "../../profile.module.css";

// Types
interface AdditionalInfoProps {
	label: string;
	value: string | undefined;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ label, value }) => {
    if (!value) {
        return null;
    }
	return (
		<div className={styles.additionalInfo}>
			<div>{label}</div>
			<div>{value}</div>
		</div>
	);
};

export default AdditionalInfo;
