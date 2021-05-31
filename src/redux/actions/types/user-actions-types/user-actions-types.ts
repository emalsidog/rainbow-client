import {
	ChangeName,
	UserExtended,
	EmailChangingProcess,
	ChangeEmail,
} from "./user-common-types";

const SET_USER = "SET_USER";

const GET_USER_REQUEST = "GET_USER_REQUEST";
const GET_USER_SUCCESS = "GET_USER_SUCCESS";
const GET_USER_FAILURE = "GET_USER_FAILURE";

const CHANGE_NAME_REQUEST = "CHANGE_NAME_REQUEST";
const CHANGE_NAME_SUCCESS = "CHANGE_NAME_SUCCESS";
const CHANGE_NAME_FAILURE = "CHANGE_NAME_FAILURE";

const CHANGE_PROFILE_ID_REQUEST = "CHANGE_PROFILE_ID_REQUEST";
const CHANGE_PROFILE_ID_SUCCESS = "CHANGE_PROFILE_ID_SUCCESS";
const CHANGE_PROFILE_ID_FAILURE = "CHANGE_PROFILE_ID_FAILURE";

const CHANGE_EMAIL_REQ_REQUEST = "CHANGE_EMAIL_REQ_REQUEST";
const CHANGE_EMAIL_REQ_SUCCESS = "CHANGE_EMAIL_REQ_SUCCESS";
const CHANGE_EMAIL_REQ_FAILURE = "CHANGE_EMAIL_REQ_FAILURE";

const CHANGE_EMAIL_REQUEST = "CHANGE_EMAIL_REQUEST";
const CHANGE_EMAIL_SUCCESS = "CHANGE_EMAIL_SUCCESS";
const CHANGE_EMAIL_FAILURE = "CHANGE_EMAIL_FAILURE";

const CHANGE_EMAIL_ABORT_REQUEST = "CHANGE_EMAIL_ABORT_REQUEST";
const CHANGE_EMAIL_ABORT_SUCCESS = "CHANGE_EMAIL_ABORT_SUCCESS";
const CHANGE_EMAIL_ABORT_FAILURE = "CHANGE_EMAIL_ABORT_FAILURE";

const DELETE_ACCOUNT_REQUEST = "DELETE_ACCOUNT_REQUEST";
const DELETE_ACCOUNT_SUCCESS = "DELETE_ACCOUNT_SUCCESS";
const DELETE_ACCOUNT_FAILURE = "DELETE_ACCOUNT_FAILURE";

// SET USER

export interface SetUser {
	type: typeof SET_USER;
	payload: UserExtended;
}

// GET USER

export interface GetUserRequest {
	type: typeof GET_USER_REQUEST;
}

export interface GetUserSuccess {
	type: typeof GET_USER_SUCCESS;
}

export interface GetUserFailure {
	type: typeof GET_USER_FAILURE;
}

// CHANGE NAME

export interface ChangeNameRequest {
	type: typeof CHANGE_NAME_REQUEST;
	payload: ChangeName;
}

export interface ChangeNameSuccess {
	type: typeof CHANGE_NAME_SUCCESS;
	payload: ChangeName;
}

export interface ChangeNameFailure {
	type: typeof CHANGE_NAME_FAILURE;
}

// CHANGE PROFILE ID

export interface ChangeProfileIdRequest {
	type: typeof CHANGE_PROFILE_ID_REQUEST;
	profileId: string;
}

export interface ChangeProfileIdSuccess {
	type: typeof CHANGE_PROFILE_ID_SUCCESS;
	profileId: string;
}

export interface ChangeProfileIdFailure {
	type: typeof CHANGE_PROFILE_ID_FAILURE;
}

// CHANGE EMAIL REQUEST

export interface ChangeEmailReqRequest {
	type: typeof CHANGE_EMAIL_REQ_REQUEST;
	email: string;
}

export interface ChangeEmailReqSuccess {
	type: typeof CHANGE_EMAIL_REQ_SUCCESS;
	payload: EmailChangingProcess;
}

export interface ChangeEmailReqFailure {
	type: typeof CHANGE_EMAIL_REQ_FAILURE;
}

// CHANGE EMAIL

export interface ChangeEmailRequest {
	type: typeof CHANGE_EMAIL_REQUEST;
	otp: string;
}

export interface ChangeEmailSuccess {
	type: typeof CHANGE_EMAIL_SUCCESS;
	payload: ChangeEmail;
}

export interface ChangeEmailFailure {
	type: typeof CHANGE_EMAIL_FAILURE;
}

// CHANGE EMAIL ABORT

export interface ChangeEmailAbortRequest {
	type: typeof CHANGE_EMAIL_ABORT_REQUEST;
}

export interface ChangeEmailAbortSuccess {
	type: typeof CHANGE_EMAIL_ABORT_SUCCESS;
	payload: EmailChangingProcess;
}

export interface ChangeEmailAbortFailure {
	type: typeof CHANGE_EMAIL_ABORT_FAILURE;
}

// DELETE ACCOUNT

export interface DeleteAccountRequest {
	type: typeof DELETE_ACCOUNT_REQUEST;
	password: string;
}

export interface DeleteAccountSuccess {
	type: typeof DELETE_ACCOUNT_SUCCESS;
}

export interface DeleteAccountFailure {
	type: typeof DELETE_ACCOUNT_FAILURE;
}

export type UserActionTypes =
	| SetUser
	| GetUserRequest
	| GetUserSuccess
	| GetUserFailure
	| ChangeNameRequest
	| ChangeNameSuccess
	| ChangeNameFailure
	| ChangeProfileIdRequest
	| ChangeProfileIdSuccess
	| ChangeProfileIdFailure
	| ChangeEmailReqRequest
	| ChangeEmailReqSuccess
	| ChangeEmailReqFailure
	| ChangeEmailRequest
	| ChangeEmailSuccess
	| ChangeEmailFailure
	| ChangeEmailAbortRequest
	| ChangeEmailAbortSuccess
	| ChangeEmailAbortFailure
	| DeleteAccountRequest
	| DeleteAccountSuccess
	| DeleteAccountFailure;
