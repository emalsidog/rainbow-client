import { User } from "../common-types";

const GET_POPULATED_FRIENDS_REQUEST = "GET_POPULATED_FRIENDS_REQUEST";
const GET_POPULATED_FRIENDS_SUCCESS = "GET_POPULATED_FRIENDS_SUCCESS";
const GET_POPULATED_FRIENDS_FAILURE = "GET_POPULATED_FRIENDS_FAILURE";

const GET_POPULATED_FRIEND_REQUESTS_REQUEST =
	"GET_POPULATED_FRIEND_REQUESTS_REQUEST";
const GET_POPULATED_FRIEND_REQUESTS_SUCCESS =
	"GET_POPULATED_FRIEND_REQUESTS_SUCCESS";
const GET_POPULATED_FRIEND_REQUESTS_FAILURE =
	"GET_POPULATED_FRIEND_REQUESTS_FAILURE";

const UPDATE_FRIENDS_WHEN_ACCEPTED_REQUEST =
	"UPDATE_FRIENDS_WHEN_ACCEPTED_REQUEST";
const FRIEND_REQUEST_CANCELLED = "FRIEND_REQUEST_CANCELLED";
const UPDATE_REQUEST_COUNTER = "UPDATE_REQUEST_COUNTER";

const UPDATE_USER_WHO_ACCEPTED = "UPDATE_USER_WHO_ACCEPTED";
const FRIEND_REQUEST_DECLINED = "FRIEND_REQUEST_DECLINED";
const REMOVE_FROM_FRIENDS = "REMOVE_FROM_FRIENDS";

// SEND FRIEND REQUEST

const SEND_FRIEND_REQ_REQUEST = "SEND_FRIEND_REQ_REQUEST";
const SEND_FRIEND_REQ_SUCCESS = "SEND_FRIEND_REQ_SUCCESS";
const SEND_FRIEND_REQ_FAILURE = "SEND_FRIEND_REQ_FAILURE";
const SEND_FRIEND_REQ_WS = "SEND_FRIEND_REQ_WS";

export interface SendFriendReqRequest {
	type: typeof SEND_FRIEND_REQ_REQUEST;
	profileId: string;
}

export interface SendFriendReqSuccess {
	type: typeof SEND_FRIEND_REQ_SUCCESS;
	payload: {
		newRequestId: string;
		idOfUserToUpdate: string;
	};
}

export interface SendFriendReqFailure {
	type: typeof SEND_FRIEND_REQ_FAILURE;
}

export interface SendFriendReqWS {
	type: typeof SEND_FRIEND_REQ_WS;
	payload: {
		newRequestId: string;
		requestsCount: number;
	};
}

// ACCEPT FRIEND REQUEST

const ACCEPT_FRIEND_REQ_REQUEST = "ACCEPT_FRIEND_REQ_REQUEST";
const ACCEPT_FRIEND_REQ_SUCCESS = "ACCEPT_FRIEND_REQ_SUCCESS";
const ACCEPT_FRIEND_REQ_FAILURE = "ACCEPT_FRIEND_REQ_FAILURE";
const ACCEPT_FRIEND_REQ_WS = "ACCEPT_FRIEND_REQ_WS";

export interface AcceptFriendReqSuccessPayload {
	idOfUserWhoAccepted: string;
	newFriendId: string;
	requestsCount: number;
}

export interface AcceptFriendReqRequest {
	type: typeof ACCEPT_FRIEND_REQ_REQUEST;
	id: string;
}

export interface AcceptFriendReqSuccess {
	type: typeof ACCEPT_FRIEND_REQ_SUCCESS;
	payload: AcceptFriendReqSuccessPayload;
}

export interface AcceptFriendReqFailure {
	type: typeof ACCEPT_FRIEND_REQ_FAILURE;
}

export interface AcceptFriendReqWS {
	type: typeof ACCEPT_FRIEND_REQ_WS;
	payload: {
		idOfUserWhoAccepted: string;
		acceptedUserId: string;
	}
}

// CANCEL FRIEND REQUEST

const CANCEL_FRIEND_REQ_REQUEST = "CANCEL_FRIEND_REQ_REQUEST";
const CANCEL_FRIEND_REQ_SUCCESS = "CANCEL_FRIEND_REQ_SUCCESS";
const CANCEL_FRIEND_REQ_FAILURE = "CANCEL_FRIEND_REQ_FAILURE";
const CANCEL_FRIEND_REQ_WS = "CANCEL_FRIEND_REQ_WS";

export interface CancelFriendReqRequest {
	type: typeof CANCEL_FRIEND_REQ_REQUEST,
	id: string
}

export interface CancelFriendReqSuccess {
	type: typeof CANCEL_FRIEND_REQ_SUCCESS;
	payload: {
		cancelledRequestId: string;
		userToUpdate: string;
	}
}

export interface CancelFriendReqFailure {
	type: typeof CANCEL_FRIEND_REQ_FAILURE
}

export interface CancelFriendReqWS {
	type: typeof CANCEL_FRIEND_REQ_WS,
	payload: {
		cancelledRequestId: string;
		requestsCount: number;
	}
}

// DECLINE FRIEND REQUEST

const DECLINE_FRIEND_REQ_REQUEST = "DECLINE_FRIEND_REQ_REQUEST";
const DECLINE_FRIEND_REQ_SUCCESS = "DECLINE_FRIEND_REQ_SUCCESS";
const DECLINE_FRIEND_REQ_FAILURE = "DECLINE_FRIEND_REQ_FAILURE";
const DECLINE_FRIEND_REQ_WS = "DECLINE_FRIEND_REQ_WS";

export interface DeclineFriendReqRequest {
	type: typeof DECLINE_FRIEND_REQ_REQUEST;
	id: string;
}

export interface DeclineFriendReqSuccess {
	type: typeof DECLINE_FRIEND_REQ_SUCCESS;
	payload: {
		declinedRequestId: string;
		requestsCount: number;
	}
}

export interface DeclineFriendReqFailure {
	type: typeof DECLINE_FRIEND_REQ_FAILURE;
}

export interface DeclineFriendReqWS {
	type: typeof DECLINE_FRIEND_REQ_WS;
	payload: {
		userToUpdate: string;
		declinedRequestId: string;
	}
}

// REMOVE FROM FRIENDS

const REMOVE_FROM_FRIENDS_REQUEST = "REMOVE_FROM_FRIENDS_REQUEST";
const REMOVE_FROM_FRIENDS_SUCCESS = "REMOVE_FROM_FRIENDS_SUCCESS";
const REMOVE_FROM_FRIENDS_FAILURE = "REMOVE_FROM_FRIENDS_FAILURE";
const REMOVE_FROM_FRIENDS_WS = "REMOVE_FROM_FRIENDS_WS";

export interface RemoveFromFriendsRequest {
	type: typeof REMOVE_FROM_FRIENDS_REQUEST;
	id: string;
}

export interface RemoveFromFriendsSuccess {
	type: typeof REMOVE_FROM_FRIENDS_SUCCESS;
	removedFriendId: string;
}

export interface RemoveFromFriendsFailure {
	type: typeof REMOVE_FROM_FRIENDS_FAILURE;
}

export interface RemoveFromFriendsWS {
	type: typeof REMOVE_FROM_FRIENDS_WS;
	removedFriendId: string;
}


// GET POPULATED FRIENDS

export interface GetPopulatedFriendsRequest {
	type: typeof GET_POPULATED_FRIENDS_REQUEST;
	payload: {
		requestOptions: {
			page: number;
		};
		options?: {
			displayName: string;
		};
	};
}

export interface GetPopulatedFriendsSuccess {
	type: typeof GET_POPULATED_FRIENDS_SUCCESS;
	payload: {
		friends: User[];
		meta: {
			hasMoreData: boolean;
			hasMoreSearchedData: boolean;
			usersNeedToBeCleared: boolean;
		};
	};
}

export interface GetPopulatedFriendsFailure {
	type: typeof GET_POPULATED_FRIENDS_FAILURE;
}

// GET POPULATED FRIEND REQUESTS

export interface GetPopulatedFriendRequestsRequest {
	type: typeof GET_POPULATED_FRIEND_REQUESTS_REQUEST;
	requestOptions: {
		page: number;
	};
}

export interface GetPopulatedFriendRequestsSuccess {
	type: typeof GET_POPULATED_FRIEND_REQUESTS_SUCCESS;
	payload: {
		friendRequests: User[];
		hasMoreData: boolean;
	};
}

export interface GetPopulatedFriendRequestsFailure {
	type: typeof GET_POPULATED_FRIEND_REQUESTS_FAILURE;
}

// WEB SOCKETS ACTIONS

export interface UpdateFriendsWhenAcceptedRequest {
	type: typeof UPDATE_FRIENDS_WHEN_ACCEPTED_REQUEST;
	newFriendId: string;
}

export interface FriendRequestCancelled {
	type: typeof FRIEND_REQUEST_CANCELLED;
	idOfUserWhoCancelled: string;
}

export interface UpdateRequestsCounter {
	type: typeof UPDATE_REQUEST_COUNTER;
	count: number;
}

export interface UpdateUserWhoAccepted {
	type: typeof UPDATE_USER_WHO_ACCEPTED;
	payload: {
		idOfUserWhoAccepted: string;
		acceptedUserId: string;
	};
}

export interface FriendRequestDeclined {
	type: typeof FRIEND_REQUEST_DECLINED;
	payload: {
		declinedRequestId: string;
		idOfUserWhoDeclined: string;
	};
}

export interface FriendRemoved {
	type: typeof REMOVE_FROM_FRIENDS;
	payload: {
		idOfUserWhoHasFriend: string;
		idOfUserToRemove: string;
	};
}

export type FriendsActionTypes =
	| SendFriendReqRequest
	| SendFriendReqSuccess
	| SendFriendReqFailure
	| SendFriendReqWS
	// -
	| AcceptFriendReqRequest
	| AcceptFriendReqSuccess
	| AcceptFriendReqFailure
	| AcceptFriendReqWS
	// -
	| CancelFriendReqRequest
	| CancelFriendReqSuccess
	| CancelFriendReqFailure
	| CancelFriendReqWS
	// -
	| DeclineFriendReqRequest
	| DeclineFriendReqSuccess
	| DeclineFriendReqFailure
	| DeclineFriendReqWS
	// -
	| RemoveFromFriendsRequest
	| RemoveFromFriendsSuccess
	| RemoveFromFriendsFailure
	| RemoveFromFriendsWS
	// -
	| GetPopulatedFriendsRequest
	| GetPopulatedFriendsSuccess
	| GetPopulatedFriendsFailure
	| GetPopulatedFriendRequestsRequest
	| GetPopulatedFriendRequestsSuccess
	| GetPopulatedFriendRequestsFailure
	| UpdateFriendsWhenAcceptedRequest
	| FriendRequestCancelled
	| UpdateRequestsCounter
	| UpdateUserWhoAccepted
	| FriendRequestDeclined
	| FriendRemoved;
