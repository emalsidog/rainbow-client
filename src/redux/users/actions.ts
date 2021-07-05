// Types
import { AppActionTypes } from "../common-types";
import {
	GetUserPayload,
	SearchUsersRequestPayload,
	SearchUsersSuccessPayload,
} from "./types";

// GET USER BY ID

export const getUserByIdRequest = (profileId: string): AppActionTypes => ({
	type: "GET_USER_BY_ID_REQUEST",
	profileId,
});

export const getUserByIdSuccess = (payload: GetUserPayload): AppActionTypes => ({
	type: "GET_USER_BY_ID_SUCCESS",
	payload,
});

export const getUserByIdFailure = (): AppActionTypes => ({
	type: "GET_USER_BY_ID_FAILURE",
});

export const setIsFetchingUser = (isFetching: boolean): AppActionTypes => ({
	type: "SET_IS_FETCHING_USER",
	isFetching
});

// SEARCH USERS

export const searchUsersRequest = (payload: SearchUsersRequestPayload): AppActionTypes => ({
	type: "SEARCH_USERS_REQUEST",
	payload,
});

export const searchUsersSuccess = (payload: SearchUsersSuccessPayload): AppActionTypes => ({
	type: "SEARCH_USERS_SUCCESS",
	payload,
});

export const searchUsersFailure = (): AppActionTypes => ({
	type: "SEARCH_USERS_FAILURE",
});