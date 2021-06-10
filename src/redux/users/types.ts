import { PostType } from "../common-types"

const GET_USER_BY_ID_REQUEST = "GET_USER_BY_ID_REQUEST";
const GET_USER_BY_ID_SUCCESS = "GET_USER_BY_ID_SUCCESS";
const GET_USER_BY_ID_FAILURE = "GET_USER_BY_ID_FAILURE";

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

export type UsersActionTypes =
	| GetUseByIdRequest
	| GetUseByIdSuccess
	| GetUseByIdFailure;
