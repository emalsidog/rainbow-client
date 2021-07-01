// Dependencies
import React from "react";

// Styles
import styles from "./post.module.css";

// Components
import SkeletonElement from "../../../../skeleton-element";

const PostSkeleton: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div>
                    <SkeletonElement type="avatar" />
                </div>
                <div className={styles.name}>
                    <SkeletonElement type="title" />
                    <SkeletonElement type="text" />
                </div>
            </div>
            <div className={styles.body}>
                <SkeletonElement type="text" />
                <SkeletonElement type="text" />
                <SkeletonElement type="text" />
            </div>
            <div className={styles.footer}>
                <SkeletonElement type="text" />
            </div>
        </div>
    )
}

export default PostSkeleton;