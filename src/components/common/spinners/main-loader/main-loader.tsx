// Dependencies
import React from "react";

// Styles
import styles from "./main-loader.module.css";

const MainLoader: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.loader}></div>
        </div>
    )
}

export default MainLoader;