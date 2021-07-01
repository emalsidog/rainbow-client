// Dependencies
import React from "react";

// Styles
import styles from "./main-info-skeleton.module.css";

// Components
import SkeletonElement from "../../../../skeleton-element";

const MainInfoSkeleton: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <SkeletonElement type="title" />
            <div className={styles.additional}>
                <SkeletonElement width="30%" type="text" />
                <SkeletonElement width="30%" type="text" />
            </div>
            <div className={styles.additional}>
                <SkeletonElement width="30%" type="text" />
                <SkeletonElement width="30%" type="text" />
            </div>
        </div>
    );
}

export default MainInfoSkeleton;