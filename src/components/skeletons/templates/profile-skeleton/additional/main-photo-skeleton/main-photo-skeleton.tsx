// Dependencies
import React from "react";

// Styles
import styles from "./main-photo-skeleton.module.css";

// Components
import SkeletonElement from "../../../../skeleton-element";

const MainPhotoSkeleton: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <SkeletonElement type="thumbnail" />
        </div>
    );
}

export default MainPhotoSkeleton;