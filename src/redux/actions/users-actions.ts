// Types
import { AppActionTypes } from "./types";
import { GetUserPayload } from "./types/users-actions-types/users-common-types";

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
