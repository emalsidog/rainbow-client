// Types
import { AppActionTypes } from "../common-types";
import { GetUserPayload, SearchOptions, User } from "./types";

// GET USER BY ID

export const getUserByIdRequest = (profileId: string): AppActionTypes => ({
	type: "GET_USER_BY_ID_REQUEST",
	profileId,
});

export const getUserByIdSuccess = (
	payload: GetUserPayload
): AppActionTypes => ({
	type: "GET_USER_BY_ID_SUCCESS",
	payload,
});

export const getUserByIdFailure = (): AppActionTypes => ({
	type: "GET_USER_BY_ID_FAILURE",
});

// SEARCH USER BY NAME

export const searchUserRequest = (payload: SearchOptions): AppActionTypes => ({
	type: "SEARCH_USER_REQUEST",
	payload,
});

export const searchUserSuccess = (payload: User[]): AppActionTypes => ({
	type: "SEARCH_USER_SUCCESS",
	payload,
});

export const searchUserFailure = (): AppActionTypes => ({
	type: "SEARCH_USER_FAILURE",
});
