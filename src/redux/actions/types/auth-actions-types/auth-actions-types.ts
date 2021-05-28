import {
	RegisterData,
	LoginData,
	Status,
	ResetData,
} from "./auth-common-types";

const REGISTER_REQUEST = "REGISTER_REQUEST";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAILURE = "REGISTER_FAILURE";

const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";

const ACTIVATE_REQUEST = "ACTIVATE_REQUEST";
const ACTIVATE_SUCCESS = "ACTIVATE_SUCCESS";
const ACTIVATE_FAILURE = "ACTIVATE_FAILURE";

const LOGOUT_REQUEST = "LOGOUT_REQUEST";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const LOGOUT_FAILURE = "LOGOUT_FAILURE";

const FORGOT_REQUEST = "FORGOT_REQUEST";
const FORGOT_SUCCESS = "FORGOT_SUCCESS";
const FORGOT_FAILURE = "FORGOT_FAILURE";

const RESET_REQUEST = "RESET_REQUEST";
const RESET_SUCCESS = "RESET_SUCCESS";
const RESET_FAILURE = "RESET_FAILURE";

// REGISTER

export interface RegisterRequest {
	type: typeof REGISTER_REQUEST;
	payload: RegisterData;
}

export interface RegisterSuccess {
	type: typeof REGISTER_SUCCESS;
}

export interface RegisterFailure {
	type: typeof REGISTER_FAILURE;
}

// LOGIN

export interface LoginRequest {
	type: typeof LOGIN_REQUEST;
	payload: LoginData;
}

export interface LoginSuccess {
	type: typeof LOGIN_SUCCESS;
}

export interface LoginFailure {
	type: typeof LOGIN_FAILURE;
}

// ACTIVATE

export interface ActivateRequest {
	type: typeof ACTIVATE_REQUEST;
	activationToken: string;
}

export interface ActivateSuccess {
	type: typeof ACTIVATE_SUCCESS;
	payload: Status;
}

export interface ActivateFailure {
	type: typeof ACTIVATE_FAILURE;
	payload: Status;
}

// LOGOUT

export interface LogoutRequest {
	type: typeof LOGOUT_REQUEST;
}

export interface LogoutSuccess {
	type: typeof LOGOUT_SUCCESS;
}

export interface LogoutFailure {
	type: typeof LOGOUT_FAILURE;
}

// FORGOT

export interface ForgotRequest {
	type: typeof FORGOT_REQUEST;
	email: string;
}

export interface ForgotSuccess {
	type: typeof FORGOT_SUCCESS;
}

export interface ForgotFailure {
	type: typeof FORGOT_FAILURE;
}

// RESET

export interface ResetRequest {
	type: typeof RESET_REQUEST;
	payload: ResetData;
}

export interface ResetSuccess {
	type: typeof RESET_SUCCESS;
	payload: Status;
}

export interface ResetFailure {
	type: typeof RESET_FAILURE;
	payload: Status;
}

export type AuthActionTypes =
	| RegisterRequest
	| RegisterSuccess
	| RegisterFailure
	| LoginRequest
	| LoginSuccess
	| LoginFailure
	| ActivateRequest
	| ActivateSuccess
	| ActivateFailure
	| LogoutRequest
	| LogoutSuccess
	| LogoutFailure
	| ForgotRequest
	| ForgotSuccess
	| ForgotFailure
	| ResetRequest
	| ResetSuccess
	| ResetFailure;
