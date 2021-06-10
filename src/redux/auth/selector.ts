// Types
import { RootState } from "../store";
import { Status } from "./types";

// IS LOADING
export const selectIsLoading = (state: RootState): boolean =>
	state.auth.isLoading;

// IS AUTHENTICATED
export const selectIsAuthenticated = (state: RootState): boolean =>
	state.auth.isAuthenticated;

// STATUS
export const selectStatus = (state: RootState): Status => state.auth.status;

// IS LOADING FORGOT PASSWORD
export const selectIsLoadingForgotPassword = (state: RootState): boolean =>
	state.auth.isLoadingForgotPassword;

// REDIRECT
export const selectRedirect = (state: RootState): boolean =>
	state.auth.redirect;