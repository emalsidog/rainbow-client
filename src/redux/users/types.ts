import { PostType, User } from "../common-types";

const GET_USER_BY_ID_REQUEST = "GET_USER_BY_ID_REQUEST";
const GET_USER_BY_ID_SUCCESS = "GET_USER_BY_ID_SUCCESS";
const GET_USER_BY_ID_FAILURE = "GET_USER_BY_ID_FAILURE";

const SEARCH_USERS_REQUEST = "SEARCH_USERS_REQUEST";
const SEARCH_USERS_SUCCESS = "SEARCH_USERS_SUCCESS";
const SEARCH_USERS_FAILURE = "SEARCH_USERS_FAILURE";

const SEND_FRIEND_REQ_REQUEST = "SEND_FRIEND_REQ_REQUEST";
const SEND_FRIEND_REQ_SUCCESS = "SEND_FRIEND_REQ_SUCCESS";
const SEND_FRIEND_REQ_FAILURE = "SEND_FRIEND_REQ_FAILURE";

const ACCEPT_FRIEND_REQ_REQUEST = "ACCEPT_FRIEND_REQ_REQUEST";
const ACCEPT_FRIEND_REQ_SUCCESS = "ACCEPT_FRIEND_REQ_SUCCESS";
const ACCEPT_FRIEND_REQ_FAILURE = "ACCEPT_FRIEND_REQ_FAILURE";

const DECLINE_FRIEND_REQ_REQUEST = "DECLINE_FRIEND_REQ_REQUEST";
const DECLINE_FRIEND_REQ_SUCCESS = "DECLINE_FRIEND_REQ_SUCCESS";
const DECLINE_FRIEND_REQ_FAILURE = "DECLINE_FRIEND_REQ_FAILURE";

const CANCEL_FRIEND_REQ_REQUEST = "CANCEL_FRIEND_REQ_REQUEST";
const CANCEL_FRIEND_REQ_SUCCESS = "CANCEL_FRIEND_REQ_SUCCESS";
const CANCEL_FRIEND_REQ_FAILURE = "CANCEL_FRIEND_REQ_FAILURE";

const REMOVE_FROM_FRIENDS_REQUEST = "REMOVE_FROM_FRIENDS_REQUEST";
const REMOVE_FROM_FRIENDS_SUCCESS = "REMOVE_FROM_FRIENDS_SUCCESS";
const REMOVE_FROM_FRIENDS_FAILURE = "REMOVE_FROM_FRIENDS_FAILURE";

const NEW_POST_ADDED = "NEW_POST_ADDED";
const DELETE_POST = "DELETE_POST";
const POST_UPDATED = "POST_UPDATED";



// GET USER PAYLOAD TYPES

export interface GetUserPayload {
	user: User;
	isCurrentUser: boolean;
}

// SEARCH USERS PAYLOAD TYPES

export interface SearchUsersRequestPayload {
	requestOptions: {
		page: number;
	};
	options?: {
		displayName: string;
	};
	needsToBeCleared?: boolean;
}

export interface SearchUsersSuccessPayload {
	users: User[];
	meta: {
		hasMoreData: boolean;
		hasMoreSearchedData: boolean;
	};
}

// GET USER

export interface GetUserByIdRequest {
	type: typeof GET_USER_BY_ID_REQUEST;
	profileId: string;
}

export interface GetUserByIdSuccess {
	type: typeof GET_USER_BY_ID_SUCCESS;
	payload: GetUserPayload;
}

export interface GetUserByIdFailure {
	type: typeof GET_USER_BY_ID_FAILURE;
}

// SEARCH USERS

export interface SearchUsersRequest {
	type: typeof SEARCH_USERS_REQUEST;
	payload: SearchUsersRequestPayload;
}

export interface SearchUsersSuccess {
	type: typeof SEARCH_USERS_SUCCESS;
	payload: SearchUsersSuccessPayload;
}

export interface SearchUsersFailure {
	type: typeof SEARCH_USERS_FAILURE;
}

// SEND FRIEND REQUEST

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

// ACCEPT FRIEND REQUEST

export interface AcceptFriendReqRequest {
	type: typeof ACCEPT_FRIEND_REQ_REQUEST;
	id: string;
}

export interface AcceptFriendReqSuccess {
	type: typeof ACCEPT_FRIEND_REQ_SUCCESS;
}

export interface AcceptFriendReqFailure {
	type: typeof ACCEPT_FRIEND_REQ_FAILURE;
}

// DECLINE FREIND REQUEST

export interface DeclineFriendReqRequest {
	type: typeof DECLINE_FRIEND_REQ_REQUEST;
	id: string;
}

export interface DeclineFriendReqSuccess {
	type: typeof DECLINE_FRIEND_REQ_SUCCESS;
}

export interface DeclineFriendReqFailure {
	type: typeof DECLINE_FRIEND_REQ_FAILURE;
}

// CANCEL FRIEND REQUEST

export interface CancelFriendReqRequest {
	type: typeof CANCEL_FRIEND_REQ_REQUEST;
	id: string;
}

export interface CancelFriendReqSuccess {
	type: typeof CANCEL_FRIEND_REQ_SUCCESS;
}

export interface CancelFriendReqFailure {
	type: typeof CANCEL_FRIEND_REQ_FAILURE;
}

// REMOVE FROM FRIENDS

export interface RemoveFromFriendsRequest {
	type: typeof REMOVE_FROM_FRIENDS_REQUEST;
	id: string;
}

export interface RemoveFromFriendsSuccess {
	type: typeof REMOVE_FROM_FRIENDS_SUCCESS;
}

export interface RemoveFromFriendsFailure {
	type: typeof REMOVE_FROM_FRIENDS_FAILURE;
}

// NEW POST ADDED (BY SOMEONE)

export interface NewPostAdded {
	type: typeof NEW_POST_ADDED;
	payload: PostType;
}

// POST DELETED (BY SOMEONE)

export interface DeletePost {
	type: typeof DELETE_POST;
	postId: string;
}

// POST UPDATED (BY SOMEONE)

export interface PostUpdated {
	type: typeof POST_UPDATED;
	payload: PostType;
}







const UPDATE_USER_WHO_ACCEPTED = "UPDATE_USER_WHO_ACCEPTED";
// update user, who accepted friend request of current user
export interface UpdateUserWhoAccepted {
	type: typeof UPDATE_USER_WHO_ACCEPTED,
	payload: {
		idOfUserWhoAccepted: string;
		acceptedUserId: string;
	}
}











export type UsersActionTypes =
	| GetUserByIdRequest
	| GetUserByIdSuccess
	| GetUserByIdFailure
	| SearchUsersRequest
	| SearchUsersSuccess
	| SearchUsersFailure
	| SendFriendReqRequest
	| SendFriendReqSuccess
	| SendFriendReqFailure
	| AcceptFriendReqRequest
	| AcceptFriendReqSuccess
	| AcceptFriendReqFailure
	| DeclineFriendReqRequest
	| DeclineFriendReqSuccess
	| DeclineFriendReqFailure
	| CancelFriendReqRequest
	| CancelFriendReqSuccess
	| CancelFriendReqFailure
	| RemoveFromFriendsRequest
	| RemoveFromFriendsSuccess
	| RemoveFromFriendsFailure
	| NewPostAdded
	| DeletePost
	| PostUpdated | UpdateUserWhoAccepted