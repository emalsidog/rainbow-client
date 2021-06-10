// Types
import { AppActionTypes } from "../common-types";
import { GetUserPayload } from "./types";

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
