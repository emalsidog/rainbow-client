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


// CANCEL FRIEND REQUEST

export const cancelFriendReqRequest = (id: string): AppActionTypes => ({
	type: "CANCEL_FRIEND_REQ_REQUEST",
	id,
});

export const cancelFriendReqSuccess = (payload: {
	idOfUserWhoCancelled: string; 
	userWhoHasRequest: string;
}): AppActionTypes => ({
	type: "CANCEL_FRIEND_REQ_SUCCESS",
	payload
});

export const cancelFriendReqFailure = (): AppActionTypes => ({
	type: "CANCEL_FRIEND_REQ_FAILURE",
});
