// Dependencies
import React from "react";

// Styles
import styles from "./people-card-skeleton.module.css";

// Components
import SkeletonElement from "../../skeleton-element";

const PeopleSkeleton: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <SkeletonElement type="thumbnail" />
            <SkeletonElement type="text" />
        </div>
    )
}

export default PeopleSkeleton;