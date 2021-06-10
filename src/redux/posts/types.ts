import { PostType } from "../common-types";

const ADD_POST_REQUEST = "ADD_POST_REQUEST";
const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export interface AddPostRequest {
	type: typeof ADD_POST_REQUEST;
	payload: PostType;
}

export interface AddPostSuccess {
	type: typeof ADD_POST_SUCCESS;
	payload: PostType;
}

export interface AddPostFailure {
	type: typeof ADD_POST_FAILURE;
}

export type PostActionTypes = AddPostRequest | AddPostSuccess | AddPostFailure;
