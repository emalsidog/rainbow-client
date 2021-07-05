// Types
import { AppActionTypes } from "../common-types";
import { PostType } from "../common-types";

// LOAD MORE POSTS

export const loadMorePostsRequest = (payload: {
	id: string;
	page: number;
}) => ({
	type: "LOAD_MORE_POSTS_REQUEST",
	payload
});

export const loadMorePostsSuccess = (payload: {
	hasMorePosts: boolean;
	posts: PostType[];
}) => ({
	type: "LOAD_MORE_POSTS_SUCCESS",
	payload
});

export const loadMorePostsFailure = () => ({
	type: "LOAD_MORE_POSTS_FAILURE"
})

// ADD POST

export const addPostRequest = (payload: PostType): AppActionTypes => ({
	type: "ADD_POST_REQUEST",
	payload,
});

export const addPostSuccess = (payload: PostType): AppActionTypes => ({
	type: "ADD_POST_SUCCESS",
	payload,
});

export const addPostFailure = (): AppActionTypes => ({
	type: "ADD_POST_FAILURE",
});

// DELETE POST

export const deletePostRequest = (postId: string): AppActionTypes => ({
	type: "DELETE_POST_REQUEST",
	postId,
});

export const deletePostSuccess = (postId: string): AppActionTypes => ({
	type: "DELETE_POST_SUCCESS",
	postId,
});

export const deletePostFailure = (): AppActionTypes => ({
	type: "DELETE_POST_FAILURE",
});

// EDIT POST

export const editPostRequest = (payload: PostType): AppActionTypes => ({
	type: "EDIT_POST_REQUEST",
	payload,
});

export const editPostSuccess = (payload: PostType): AppActionTypes => ({
	type: "EDIT_POST_SUCCESS",
	payload,
});

export const editPostFailure = (): AppActionTypes => ({
	type: "EDIT_POST_FAILURE",
});
