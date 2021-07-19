// Types
import { RootState } from "../store";
import { IsLoading, EmailChangingProcess } from "./types";
import { User } from "../common-types";

// USER
export const selectUser = (state: RootState): User => state.user.user;

// IS FETCHING
export const selectIsFetching = (state: RootState): boolean => state.user.isFetching;

// IS LOADING
export const selectIsLoading = (state: RootState): IsLoading => state.user.isLoading;

// EMAIL CHANGING PROCESS
export const selectEmailChangingProcess = (state: RootState): EmailChangingProcess => state.user.emailChangingProcess;

// FRIENDS / HAS MORE DATA / HAS MORE SEARCHED DATA
export const selectFriends = (state: RootState): [User[], boolean, boolean] => [
	state.user.populatedFields.populatedFriends.friends,
	state.user.populatedFields.populatedFriends.hasMoreData,
	state.user.populatedFields.populatedFriends.hasMoreSearchedData,
];

// REQUESTS / HAS MORE DATA
export const selectRequests = (state: RootState): [User[], boolean] => [
	state.user.populatedFields.populatedFriendRequests.requests,
	state.user.populatedFields.populatedFriendRequests.hasMoreData,
];

// REQUESTS COUNTER
export const selectRequestsCounter = (state: RootState): number => state.user.requestsCounter;

// IS LOADING
export const selectUsersIsLoading = (state: RootState): IsLoading => state.user.isLoading;

// IS CURRENT USER
export const selectIsCurrentUser = (state: RootState): boolean | undefined => state.user.isCurrentUser;

// DISPLAYED USERS
export const selectDisplayedUser = (state: RootState): User => state.user.displayedUser;

// SEARCHED USERS
export const selectUsers = (state: RootState): User[] => state.user.searchedUsers;

// TOTAL USERS
export const selectHasMoreData = (state: RootState) => [
	state.user.hasMoreData,
	state.user.hasMoreSearchedData,
];

// GET ONLINE USERS
export const selectOnlineUsers = (state: RootState): string[] => state.user.onlineUsers;