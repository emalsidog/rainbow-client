import { PostType } from "../common-types";

const ADD_POST_REQUEST = "ADD_POST_REQUEST";
const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
const ADD_POST_FAILURE = "ADD_POST_FAILURE";

const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

const EDIT_POST_REQUEST = "EDIT_POST_REQUEST";
const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";
const EDIT_POST_FAILURE = "EDIT_POST_FAILURE";

// ADD POST

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

// DELETE POST

export interface DeletePostRequest {
	type: typeof DELETE_POST_REQUEST;
	postId: string;
}

export interface DeletePostSuccess {
	type: typeof DELETE_POST_SUCCESS;
	postId: string;
}

export interface DeletePostFailure {
	type: typeof DELETE_POST_FAILURE;
}

// EDIT POST

export interface EditPostRequest {
	type: typeof EDIT_POST_REQUEST;
	payload: PostType;
}

export interface EditPostSuccess {
	type: typeof EDIT_POST_SUCCESS;
	payload: PostType;
}

export interface EditPostFailure {
	type: typeof EDIT_POST_FAILURE;
}

export type PostActionTypes =
	| AddPostRequest
	| AddPostSuccess
	| AddPostFailure
	| DeletePostRequest
	| DeletePostSuccess
	| DeletePostFailure
	| EditPostRequest
	| EditPostSuccess
	| EditPostFailure;
