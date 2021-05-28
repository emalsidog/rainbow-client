// Types
import { RootState } from "../store";
import {
	IsLoading,
	User,
	EmailChangingProcess,
} from "../actions/types/user-actions-types/user-common-types";

// USER
export const selectUser = (state: RootState): User => state.user.user;

// IS FETCHING
export const selectIsFetching = (state: RootState): boolean =>
	state.user.isFetching;

// IS LOADING
export const selectIsLoading = (state: RootState): IsLoading =>
	state.user.isLoading;

// EMAIL CHANGING PROCESS
export const selectEmailChangingProcess = (
	state: RootState
): EmailChangingProcess => state.user.emailChangingProcess;
