// Dependencies
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// Actions
import { loadMorePostsRequest } from "../../../../../redux/posts/actions";

// Hooks
import { useIntersectionObserver } from "../../../../../hocs/useIntersectionObserver";

// Styles
import styles from "../../profile.module.css";

// Components
import Post from "../post";

// Types
import { PostType } from "../../../../../redux/common-types";

interface DisplayPostsProps {
	id: string;
	avatar: string;
	givenName: string;
	familyName: string;

	posts: PostType[];
	hasMorePosts: boolean;

	isCurrentUser: boolean | undefined;
}

const DisplayPosts: React.FC<DisplayPostsProps> = (props) => {
	const {
		id,
		avatar,
		givenName,
		familyName,
		posts,
		isCurrentUser,
		hasMorePosts,
	} = props;

	const dispatch = useDispatch();

	const [pageNumber, setPageNumber] = useState<number>(1);
	const { isIntersecting, ref } = useIntersectionObserver();

	useEffect(() => {
		if (hasMorePosts) {
			const payload = {
				id,
				page: pageNumber,
				isCurrentUser,
			};
			dispatch(loadMorePostsRequest(payload));
		}
	}, [dispatch, hasMorePosts, id, pageNumber, isCurrentUser]);

	useEffect(() => {
		if (isIntersecting) {
			setPageNumber((prev) => prev + 1);
		}
	}, [isIntersecting]);

	let headingRendering;
	let postsList;

	if (posts.length <= 0) {
		isCurrentUser
			? (headingRendering = "You do not have posts")
			: (headingRendering = "User does not have posts");
	} else {
		headingRendering = (
			<Post
				authorName={`${givenName} ${familyName}`}
				isCurrentUser={isCurrentUser}
				avatar={avatar}
				post={posts[0]}
			/>
		);
	}

	postsList = posts.slice(1).map((post, index) => {
		// +2 because starting from 1 index ^^^
		if (posts.length === index + 2) {
			return (
				<div ref={ref} key={post.postId} className={styles.wrapper}>
					<Post
						authorName={`${givenName} ${familyName}`}
						isCurrentUser={isCurrentUser}
						avatar={avatar}
						post={post}
					/>
				</div>
			);
		}
		return (
			<div key={post.postId} className={styles.wrapper}>
				<Post
					authorName={`${givenName} ${familyName}`}
					isCurrentUser={isCurrentUser}
					avatar={avatar}
					post={post}
				/>
			</div>
		);
	});

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
