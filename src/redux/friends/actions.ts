// Types
import { AppActionTypes, User } from "../common-types";
import { AcceptFriendReqSuccessPayload, FriendsActionTypes } from "./types";

// SEND FRIEND REQUEST

export const sendFriendReqRequest = (profileId: string): FriendsActionTypes => ({
	type: "SEND_FRIEND_REQ_REQUEST",
	profileId,
});

export const sendFriendReqSuccess = (payload: {	newRequestId: string; idOfUserToUpdate: string }): FriendsActionTypes => ({
	type: "SEND_FRIEND_REQ_SUCCESS",
	payload,
});

export const sendFriendReqFailure = (): FriendsActionTypes => ({
	type: "SEND_FRIEND_REQ_FAILURE",
});

export const sendFriendReqWS = (payload: { newRequestId: string; requestsCount: number }): FriendsActionTypes => ({
	type: "SEND_FRIEND_REQ_WS",
	payload,
});

// ACCEPT FRIEND REQUEST

export const acceptFriendReqRequest = (id: string): FriendsActionTypes => ({
	type: "ACCEPT_FRIEND_REQ_REQUEST",
	id,
});

export const acceptFriendReqSuccess = (payload: AcceptFriendReqSuccessPayload): FriendsActionTypes => ({
	type: "ACCEPT_FRIEND_REQ_SUCCESS",
	payload,
});

export const acceptFriendReqFailure = (): FriendsActionTypes => ({
	type: "ACCEPT_FRIEND_REQ_FAILURE",
});

export const acceptFriendReqWS = (payload: { idOfUserWhoAccepted: string; acceptedUserId: string }): FriendsActionTypes => ({
	type: "ACCEPT_FRIEND_REQ_WS",
	payload
});

// CANCEL FRIEND REQUEST

export const cancelFriendReqRequest = (id: string): FriendsActionTypes => ({
	type: "CANCEL_FRIEND_REQ_REQUEST",
	id
});

export const cancelFriendReqSuccess = (payload: { cancelledRequestId: string; userToUpdate: string }): FriendsActionTypes => ({
	type: "CANCEL_FRIEND_REQ_SUCCESS",
	payload
});

export const cancelFriendReqFailure = (): FriendsActionTypes => ({
	type: "CANCEL_FRIEND_REQ_FAILURE"
});

export const cancelFriendReqWS = ( payload: { cancelledRequestId: string; requestsCount: number }): FriendsActionTypes => ({
	type: "CANCEL_FRIEND_REQ_WS",
	payload
});

// DECLINE FRIEND REQUEST

export const declineFriendReqRequest = (id: string): FriendsActionTypes => ({
	type: "DECLINE_FRIEND_REQ_REQUEST",
	id,
});

export const declineFriendReqSuccess = (payload: { declinedRequestId: string; requestsCount: number }): FriendsActionTypes => ({
	type: "DECLINE_FRIEND_REQ_SUCCESS",
	payload
});

export const declineFriendReqFailure = (): FriendsActionTypes => ({
	type: "DECLINE_FRIEND_REQ_FAILURE",
});

export const declineFriendReqWS = (	payload: { userToUpdate: string; declinedRequestId: string }): FriendsActionTypes => ({
	type: "DECLINE_FRIEND_REQ_WS",
	payload
});


// REMOVE FROM FRIENDS

export const removeFromFriendsRequest = (id: string): FriendsActionTypes => ({
	type: "REMOVE_FROM_FRIENDS_REQUEST",
	id
});

export const removeFromFriendsSuccess = (removedFriendId: string): FriendsActionTypes => ({
	type: "REMOVE_FROM_FRIENDS_SUCCESS",
	removedFriendId
});

export const removeFromFriendsFailure = (): FriendsActionTypes => ({
	type: "REMOVE_FROM_FRIENDS_FAILURE"
});

export const removeFromFriendsWS = (removedFriendId: string): FriendsActionTypes => ({
	type: "REMOVE_FROM_FRIENDS_WS",
	removedFriendId
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

export const updateFriendsWhenAcceptedRequest = (
	newFriendId: string
): AppActionTypes => ({
	type: "UPDATE_FRIENDS_WHEN_ACCEPTED_REQUEST",
	newFriendId,
});

export const updateRequestsCounter = (count: number): AppActionTypes => ({
	type: "UPDATE_REQUEST_COUNTER",
	count,
});
