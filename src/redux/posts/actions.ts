// Types
import { AppActionTypes } from "../common-types";
import { PostType } from "../common-types";

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
