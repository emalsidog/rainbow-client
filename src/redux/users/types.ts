import { PostType } from "../common-types";

const GET_USER_BY_ID_REQUEST = "GET_USER_BY_ID_REQUEST";
const GET_USER_BY_ID_SUCCESS = "GET_USER_BY_ID_SUCCESS";
const GET_USER_BY_ID_FAILURE = "GET_USER_BY_ID_FAILURE";

const NEW_POST_ADDED = "NEW_POST_ADDED";
const DELETE_POST = "DELETE_POST";
const POST_UPDATED = "POST_UPDATED";

export interface User {
	avatar: string;
	birthday: Date | undefined;
	givenName: string;
	familyName: string;
	bio: string;
	registrationDate: Date | undefined;
	posts: PostType[];
}

export interface GetUserPayload {
	user: User;
	isCurrentUser: boolean;
}

// GET USER

export interface GetUseByIdRequest {
	type: typeof GET_USER_BY_ID_REQUEST;
	profileId: string;
}

export interface GetUseByIdSuccess {
	type: typeof GET_USER_BY_ID_SUCCESS;
	payload: GetUserPayload;
}

export interface GetUseByIdFailure {
	type: typeof GET_USER_BY_ID_FAILURE;
}

// NEW POST ADDED (BY SOMEONE)

export interface NewPostAdded {
	type: typeof NEW_POST_ADDED;
	payload: PostType;
}

// POST DELETED (BY SOMEONE)

export interface DeletePost {
	type: typeof DELETE_POST;
	postId: string;
}

// POST UPDATED (BY SOMEONE)

export interface PostUpdated {
	type: typeof POST_UPDATED;
	payload: PostType;
}

export type UsersActionTypes =
	| GetUseByIdRequest
	| GetUseByIdSuccess
	| GetUseByIdFailure
	| NewPostAdded
	| DeletePost
	| PostUpdated;
