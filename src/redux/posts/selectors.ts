import { PostType } from "../common-types";
import { RootState } from "../store";
import { isLoading } from "./types";

// GET POSTS
export const selectPosts = (
	state: RootState
): { posts: PostType[]; hasMorePosts: boolean } => ({
	posts: state.posts.posts,
	hasMorePosts: state.posts.hasMorePosts,
});

export const selectDisplayedUserPosts = (
	state: RootState
): { displayedUserPosts: PostType[]; hasMoreDisplayedUserPosts: boolean } => ({
	displayedUserPosts: state.posts.displayedUserPosts,
	hasMoreDisplayedUserPosts: state.posts.hasMoreDisplayedUserPosts,
});

// GET IS LOADING
export const selectIsPostsLoading = (state: RootState): isLoading =>
	state.posts.isLoading;
