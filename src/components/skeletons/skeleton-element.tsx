// Dependencies
import React from "react";

// Styles
import "./skeleton-element.css";

// Types
interface SkeletonElementProps {
    type: SkeletonType;

    width?: string;
    height?: string;
}

type SkeletonType = "title" | "text" | "thumbnail" | "avatar" | "card";

const SkeletonElement: React.FC<SkeletonElementProps> = (props) => {
    const { type, width, height } = props;
    const classNames = `skeleton ${type}`;

    let styles = {};
    if (width || height ) {
        styles = { width, height }
    }

    return <div style={ styles } className={classNames} />
}

export default SkeletonElement;