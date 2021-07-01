// Dependenices
import React from "react";

// Components
import MainInfoSkeleton from "./additional/main-info-skeleton";
import PostSkeleton from "./additional/post-skeleton";

const ProfileSkeleton: React.FC = () => {
    return (
        <React.Fragment>
            <MainInfoSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
        </React.Fragment>
    )
}

export default ProfileSkeleton;