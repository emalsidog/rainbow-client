// Types
import { AppActionTypes } from "../common-types";
import {
	GetUserPayload,
	SearchUsersRequestPayload,
	SearchUsersSuccessPayload,
} from "./types";

// GET USER BY ID

export const getUserByIdRequest = (profileId: string): AppActionTypes => ({
	type: "GET_USER_BY_ID_REQUEST",
	profileId,
});

export const getUserByIdSuccess = (
	payload: GetUserPayload
): AppActionTypes => ({
	type: "GET_USER_BY_ID_SUCCESS",
	payload,
});

export const getUserByIdFailure = (): AppActionTypes => ({
	type: "GET_USER_BY_ID_FAILURE",
});

// SEARCH USERS

export const searchUsersRequest = (
	payload: SearchUsersRequestPayload
): AppActionTypes => ({
	type: "SEARCH_USERS_REQUEST",
	payload,
});

export const searchUsersSuccess = (
	payload: SearchUsersSuccessPayload
): AppActionTypes => ({
	type: "SEARCH_USERS_SUCCESS",
	payload,
});

export const searchUsersFailure = (): AppActionTypes => ({
	type: "SEARCH_USERS_FAILURE",
});

// SEND FRIEND REQUEST

export const sendFriendReqRequest = (profileId: string): AppActionTypes => ({
	type: "SEND_FRIEND_REQ_REQUEST",
	profileId,
});

export const sendFriendReqSuccess = (payload: {
	newRequestId: string;
	idOfUserToUpdate: string;
}): AppActionTypes => ({
	type: "SEND_FRIEND_REQ_SUCCESS",
	payload,
});

export const sendFriendReqFailure = (): AppActionTypes => ({
	type: "SEND_FRIEND_REQ_FAILURE",
});

// ACCEPT FRIEND REQUEST

export const acceptFriendReqRequest = (id: string): AppActionTypes => ({
	type: "ACCEPT_FRIEND_REQ_REQUEST",
	id,
});

export const acceptFriendReqSuccess = (): AppActionTypes => ({
	type: "ACCEPT_FRIEND_REQ_SUCCESS",
});

export const acceptFriendReqFailure = (): AppActionTypes => ({
	type: "ACCEPT_FRIEND_REQ_FAILURE",
});

// DECLINE FRIEND REQUEST

export const declineFriendReqRequest = (id: string): AppActionTypes => ({
	type: "DECLINE_FRIEND_REQ_REQUEST",
	id,
});

export const declineFriendReqSuccess = (): AppActionTypes => ({
	type: "DECLINE_FRIEND_REQ_SUCCESS",
});

export const declineFriendReqFailure = (): AppActionTypes => ({
	type: "DECLINE_FRIEND_REQ_FAILURE",
});

// CANCEL FRIEND REQUEST

export const cancelFriendReqRequest = (id: string): AppActionTypes => ({
	type: "CANCEL_FRIEND_REQ_REQUEST",
	id,
});

export const cancelFriendReqSuccess = (): AppActionTypes => ({
	type: "CANCEL_FRIEND_REQ_SUCCESS",
});

export const cancelFriendReqFailure = (): AppActionTypes => ({
	type: "CANCEL_FRIEND_REQ_FAILURE",
});

// REMOVE FROM FRIENDS

export const removeFromFriendsRequest = (id: string): AppActionTypes => ({
	type: "REMOVE_FROM_FRIENDS_REQUEST",
	id,
});

export const removeFromFriendsSuccess = (): AppActionTypes => ({
	type: "REMOVE_FROM_FRIENDS_SUCCESS",
});

export const removeFromFriendsFailure = (): AppActionTypes => ({
	type: "REMOVE_FROM_FRIENDS_FAILURE",
});
