// Dependencies
import React from "react";

// Styles
import styles from "../../profile.module.css";

// Components
import Post from "../post";

// Types
import { PostType } from "../../../../../redux/common-types";

interface DisplayPostsProps {
	avatar: string;
	givenName: string;
	familyName: string;

	posts: PostType[];

	isCurrentUser: boolean | undefined;
}

const DisplayPosts: React.FC<DisplayPostsProps> = (props) => {
	const { avatar, givenName, familyName, posts, isCurrentUser } = props;

	let postsToRender = posts;
	let headingRendering;
	let postsList;

	if (!isCurrentUser) {
		postsToRender = posts.filter((post) => post.isPublic !== false);
	}

	if (postsToRender.length <= 0) {
		isCurrentUser
			? (headingRendering = "You do not have posts")
			: (headingRendering = "User does not have posts");
	} else {
		headingRendering = (
			<Post
				authorName={`${givenName} ${familyName}`}
				isCurrentUser={isCurrentUser}
				avatar={avatar}
				post={postsToRender[0]}
			/>
		);
	}

	postsList = postsToRender.slice(1).map((post) => (
		<div key={post.postId} className={styles.wrapper}>
			<Post
				authorName={`${givenName} ${familyName}`}
				isCurrentUser={isCurrentUser}
				avatar={avatar}
				post={post}
			/>
		</div>
	));

	return (
		<React.Fragment>
			<div className={styles.wrapper}>
				<div className={styles.sectionHeading}>
					<span>Posts</span>
					<hr />
				</div>
				{headingRendering}
			</div>
			{postsList}
		</React.Fragment>
	);
};

export default DisplayPosts;
