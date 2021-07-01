// Types
import { AppActionTypes, User } from "../common-types";

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

// DECLINE FRIEND REQUEST

export const declineFriendReqRequest = (id: string): AppActionTypes => ({
	type: "DECLINE_FRIEND_REQ_REQUEST",
	id,
});

export const declineFriendReqSuccess = (
	declinedRequestId: string
): AppActionTypes => ({
	type: "DECLINE_FRIEND_REQ_SUCCESS",
	declinedRequestId,
});

export const declineFriendReqFailure = (): AppActionTypes => ({
	type: "DECLINE_FRIEND_REQ_FAILURE",
});

// REMOVE FROM FRIENDS

export const removeFromFriendsRequest = (id: string): AppActionTypes => ({
	type: "REMOVE_FROM_FRIENDS_REQUEST",
	id,
});

export const removeFromFriendsSuccess = (idOfUserToRemove: string): AppActionTypes => ({
	type: "REMOVE_FROM_FRIENDS_SUCCESS",
	idOfUserToRemove,
});

export const removeFromFriendsFailure = (): AppActionTypes => ({
	type: "REMOVE_FROM_FRIENDS_FAILURE",
});

// GET POPULATED FRIENDS

export const getPopulatedFriendsRequest = (payload: {
	requestOptions: {
		page: number;
	};
	options?: {
		displayName: string;
	};
}): AppActionTypes => ({
	type: "GET_POPULATED_FRIENDS_REQUEST",
	payload,
});

export const getPopulatedFriendsSuccess = (payload: {
	friends: User[];
	meta: {
		hasMoreData: boolean;
		hasMoreSearchedData: boolean;
		usersNeedToBeCleared: boolean;
	};
}): AppActionTypes => ({
	type: "GET_POPULATED_FRIENDS_SUCCESS",
	payload,
});

export const getPopulatedFriendsFailure = (): AppActionTypes => ({
	type: "GET_POPULATED_FRIENDS_FAILURE",
});

// GET POPULATED FRIEND REQUESTS

export const getPopulatedFriendRequestsRequest = (requestOptions: {
	page: number;
}): AppActionTypes => ({
	type: "GET_POPULATED_FRIEND_REQUESTS_REQUEST",
	requestOptions,
});

export const getPopulatedFriendRequestsSuccess = (payload: {
	friendRequests: User[];
	hasMoreData: boolean;
}): AppActionTypes => ({
	type: "GET_POPULATED_FRIEND_REQUESTS_SUCCESS",
	payload,
});

export const getPopulatedFriendRequestsFailure = (): AppActionTypes => ({
	type: "GET_POPULATED_FRIEND_REQUESTS_FAILURE",
});

// WEBSOCKETS ACTIONS

export const updateFriendsWhenAcceptedRequest = (newFriendId: string): AppActionTypes => ({
	type: "UPDATE_FRIENDS_WHEN_ACCEPTED_REQUEST",
	newFriendId,
});

export const updateRequestsCounter = (count: number): AppActionTypes => ({
	type: "UPDATE_REQUEST_COUNTER",
	count,
});