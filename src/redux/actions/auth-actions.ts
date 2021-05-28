// Types
import { AppActionTypes } from "./types";
import {
	RegisterData,
	LoginData,
	Status,
	ResetData,
} from "./types/auth-actions-types/auth-common-types";

// REGISTER

export const registerRequest = (payload: RegisterData): AppActionTypes => ({
	type: "REGISTER_REQUEST",
	payload,
});

export const registerSuccess = (): AppActionTypes => ({
	type: "REGISTER_SUCCESS",
});

export const registerFailure = (): AppActionTypes => ({
	type: "REGISTER_FAILURE",
});

// LOGIN

export const loginRequest = (payload: LoginData): AppActionTypes => ({
	type: "LOGIN_REQUEST",
	payload,
});

export const loginSuccess = (): AppActionTypes => ({
	type: "LOGIN_SUCCESS",
});

export const loginFailure = (): AppActionTypes => ({
	type: "LOGIN_FAILURE",
});

// ACTIVATE

export const activateRequest = (activationToken: string): AppActionTypes => ({
	type: "ACTIVATE_REQUEST",
	activationToken,
});

export const activateSuccess = (payload: Status): AppActionTypes => ({
	type: "ACTIVATE_SUCCESS",
	payload,
});

export const activateFailure = (payload: Status): AppActionTypes => ({
	type: "ACTIVATE_FAILURE",
	payload,
});

// LOGOUT

export const logoutRequest = (): AppActionTypes => ({
	type: "LOGOUT_REQUEST",
});

export const logoutSuccess = (): AppActionTypes => ({
	type: "LOGOUT_SUCCESS",
});

export const logoutFailure = (): AppActionTypes => ({
	type: "LOGOUT_FAILURE",
});

// FORGOT

export const forgotRequest = (email: string): AppActionTypes => ({
	type: "FORGOT_REQUEST",
	email,
});

export const forgotSuccess = (): AppActionTypes => ({
	type: "FORGOT_SUCCESS",
});

export const forgotFailure = (): AppActionTypes => ({
	type: "FORGOT_FAILURE",
});

// RESET

export const resetRequest = (payload: ResetData): AppActionTypes => ({
	type: "RESET_REQUEST",
	payload,
});

export const resetSuccess = (payload: Status): AppActionTypes => ({
	type: "RESET_SUCCESS",
	payload,
});

export const resetFailure = (payload: Status): AppActionTypes => ({
	type: "RESET_FAILURE",
	payload,
});
