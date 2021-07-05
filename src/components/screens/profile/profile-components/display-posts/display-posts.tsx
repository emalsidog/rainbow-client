// Dependencies
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { loadMorePostsRequest } from "../../../../../redux/posts/actions";

// Selectors
import { selectHasMorePosts } from "../../../../../redux/users/selectors";

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

	isCurrentUser: boolean | undefined;
}

const DisplayPosts: React.FC<DisplayPostsProps> = (props) => {
	const { id, avatar, givenName, familyName, posts, isCurrentUser } = props;

	const dispatch = useDispatch();
	const hasMorePosts = useSelector(selectHasMorePosts);

	const [pageNumber, setPageNumber] = useState<number>(2);
	const { isIntersecting, ref } = useIntersectionObserver();

	useEffect(() => {
		if (hasMorePosts) {
			const payload = {
				id,
				page: pageNumber
			}
			dispatch(loadMorePostsRequest(payload));
		}
	}, [dispatch, hasMorePosts, id, pageNumber])

	useEffect(() => {
		if (isIntersecting) {
			setPageNumber((prev) => prev + 1);
		}
	}, [isIntersecting]);

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

	postsList = postsToRender.slice(1).map((post, index) => {
		
		// +2 because starting from 1 index ^^^
		if (postsToRender.length === index + 2) {
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
