import { PostType, User } from "../common-types";

const GET_USER_BY_ID_REQUEST = "GET_USER_BY_ID_REQUEST";
const GET_USER_BY_ID_SUCCESS = "GET_USER_BY_ID_SUCCESS";
const GET_USER_BY_ID_FAILURE = "GET_USER_BY_ID_FAILURE";

const SEARCH_USERS_REQUEST = "SEARCH_USERS_REQUEST";
const SEARCH_USERS_SUCCESS = "SEARCH_USERS_SUCCESS";
const SEARCH_USERS_FAILURE = "SEARCH_USERS_FAILURE";

const UPDATE_ONLINE_STATUS = "UPDATE_ONLINE_STATUS";

const SET_IS_FETCHING_USER = "SET_IS_FETCHING_USER";

// GET USER PAYLOAD TYPES

export interface GetUserPayload {
	user: User;
	isCurrentUser: boolean;
}

// SEARCH USERS PAYLOAD TYPES

export interface SearchUsersRequestPayload {
	requestOptions: {
		page: number;
	};
	options?: {
		displayName: string;
	};
}

export interface SearchUsersSuccessPayload {
	users: User[];
	meta: {
		hasMoreData: boolean;
		hasMoreSearchedData: boolean;
		usersNeedToBeCleared: boolean;
	};
}

// GET USER

export interface GetUserByIdRequest {
	type: typeof GET_USER_BY_ID_REQUEST;
	profileId: string;
}

export interface GetUserByIdSuccess {
	type: typeof GET_USER_BY_ID_SUCCESS;
	payload: GetUserPayload;
}

export interface GetUserByIdFailure {
	type: typeof GET_USER_BY_ID_FAILURE;
}

// SEARCH USERS

export interface SearchUsersRequest {
	type: typeof SEARCH_USERS_REQUEST;
	payload: SearchUsersRequestPayload;
}

export interface SearchUsersSuccess {
	type: typeof SEARCH_USERS_SUCCESS;
	payload: SearchUsersSuccessPayload;
}

export interface SearchUsersFailure {
	type: typeof SEARCH_USERS_FAILURE;
}

export interface SetIsFetchingUser {
	type: typeof SET_IS_FETCHING_USER;
	isFetching: boolean;
}

// UPDATE ONLINE STATUS
export interface UpdateOnlineStatus {
	type: typeof UPDATE_ONLINE_STATUS;
	payload: {
		isOnline: boolean;
		lastSeenOnline?: Date;
	};
}

export type UsersActionTypes =
	| GetUserByIdRequest
	| GetUserByIdSuccess
	| GetUserByIdFailure
	| SearchUsersRequest
	| SearchUsersSuccess
	| SearchUsersFailure
	| SetIsFetchingUser
	| UpdateOnlineStatus;
