// Types
import { User } from "../common-types";
import { RootState } from "../store";
import { isLoading } from "./reducer";

// IS LOADING
export const selectUsersIsLoading = (state: RootState): isLoading =>
	state.users.isLoading;

// IS CURRENT USER
export const selectIsCurrentUser = (state: RootState): boolean | undefined =>
	state.users.isCurrenUser;

// USER
export const selectUser = (state: RootState): User => state.users.user;

// USERS
export const selectUsers = (state: RootState): User[] => state.users.users;

// TOTAL USERS
export const selectHasMoreData = (state: RootState) => [
	state.users.hasMoreData,
	state.users.hasMoreSearchedData,
];

// GET ONLINE USERS
export const selectOnlineUsers = (state: RootState): string[] =>
	state.users.onlineUsers;
