// Types
import { RootState } from "../store";
import { IsLoading, EmailChangingProcess } from "./types";
import { User } from "../common-types";
import { Chat } from "../chat/types";

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
export const selectRequestsCounter = (state: RootState): number =>
	state.user.requestsCounter;

// GET CHATS
export const selectChats = (state: RootState): Chat[] => state.user.chats;
