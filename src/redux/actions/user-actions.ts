// Types
import { AppActionTypes } from "./types";
import {
	ChangeEmail,
	ChangeName,
	EmailChangingProcess,
	UserExtended,
} from "./types/user-actions-types/user-common-types";

// SET USER

export const setUser = (payload: UserExtended): AppActionTypes => ({
	type: "SET_USER",
	payload,
});

// GET USER

export const getUserRequest = (): AppActionTypes => ({
	type: "GET_USER_REQUEST",
});

export const getUserSuccess = (): AppActionTypes => ({
	type: "GET_USER_SUCCESS",
});

export const getUserFailure = (): AppActionTypes => ({
	type: "GET_USER_FAILURE",
});

// CHANGE NAME

export const changeNameRequest = (payload: ChangeName): AppActionTypes => ({
	type: "CHANGE_NAME_REQUEST",
	payload,
});

export const changeNameSuccess = (payload: ChangeName): AppActionTypes => ({
	type: "CHANGE_NAME_SUCCESS",
	payload,
});

export const changeNameFailure = (): AppActionTypes => ({
	type: "CHANGE_NAME_FAILURE",
});

// CHANGE PROFILE ID

export const changeProfileIdRequest = (profileId: string): AppActionTypes => ({
	type: "CHANGE_PROFILE_ID_REQUEST",
	profileId,
});

export const changeProfileIdSuccess = (profileId: string): AppActionTypes => ({
	type: "CHANGE_PROFILE_ID_SUCCESS",
	profileId,
});

export const changeProfileIdFailure = () => ({
	type: "CHANGE_PROFILE_ID_FAILURE",
});

// CHANGE EMAIL REQUEST

export const changeEmailReqRequest = (email: string): AppActionTypes => ({
	type: "CHANGE_EMAIL_REQ_REQUEST",
	email,
});

export const changeEmailReqSuccess = (
	payload: EmailChangingProcess
): AppActionTypes => ({
	type: "CHANGE_EMAIL_REQ_SUCCESS",
	payload,
});

export const changeEmailReqFailure = (): AppActionTypes => ({
	type: "CHANGE_EMAIL_REQ_FAILURE",
});

// CHANGE EMAIL

export const changeEmailRequest = (otp: string): AppActionTypes => ({
	type: "CHANGE_EMAIL_REQUEST",
	otp,
});

export const changeEmailSuccess = (payload: ChangeEmail): AppActionTypes => ({
	type: "CHANGE_EMAIL_SUCCESS",
	payload,
});

export const changeEmailFailure = (): AppActionTypes => ({
	type: "CHANGE_EMAIL_FAILURE",
});

// CHANGE EMAIL ABORT

export const changeEmailAbortRequest = (): AppActionTypes => ({
	type: "CHANGE_EMAIL_ABORT_REQUEST",
});

export const changeEmailAbortSuccess = (
	payload: EmailChangingProcess
): AppActionTypes => ({
	type: "CHANGE_EMAIL_ABORT_SUCCESS",
	payload,
});

export const changeEmailAbortFailure = (): AppActionTypes => ({
	type: "CHANGE_EMAIL_ABORT_FAILURE",
});
