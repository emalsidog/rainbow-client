// Dependencies
import React from "react";

// Styles
import styles from "./empty-list-indicator.module.css";

// Types
interface EmptyListIndicatorProps {
    message: string;
}

const EmptyListIndicator: React.FC<EmptyListIndicatorProps> = ({ message }) => {
    return (
        <div className={styles.message}>{message}</div>
    )
}

export default EmptyListIndicator;