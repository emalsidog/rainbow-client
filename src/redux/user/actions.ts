// Types
import { AppActionTypes, User } from "../common-types";
import {
	ChangeBirthday,
	ChangeEmail,
	ChangeName,
	ChangePassword,
	EmailChangingProcess,
	UserExtended,
} from "./types";

// SET USER

export const setUser = (payload: UserExtended): AppActionTypes => ({
	type: "SET_USER",
	payload,
});

// GET USER

export const getUserRequest = (): AppActionTypes => ({
	type: "GET_USER_REQUEST",
});

export const getUserSuccess = (): AppActionTypes => ({
	type: "GET_USER_SUCCESS",
});

export const getUserFailure = (): AppActionTypes => ({
	type: "GET_USER_FAILURE",
});

// CHANGE NAME

export const changeNameRequest = (payload: ChangeName): AppActionTypes => ({
	type: "CHANGE_NAME_REQUEST",
	payload,
});

export const changeNameSuccess = (payload: ChangeName): AppActionTypes => ({
	type: "CHANGE_NAME_SUCCESS",
	payload,
});

export const changeNameFailure = (): AppActionTypes => ({
	type: "CHANGE_NAME_FAILURE",
});

// CHANGE PROFILE ID

export const changeProfileIdRequest = (profileId: string): AppActionTypes => ({
	type: "CHANGE_PROFILE_ID_REQUEST",
	profileId,
});

export const changeProfileIdSuccess = (profileId: string): AppActionTypes => ({
	type: "CHANGE_PROFILE_ID_SUCCESS",
	profileId,
});

export const changeProfileIdFailure = () => ({
	type: "CHANGE_PROFILE_ID_FAILURE",
});

// CHANGE EMAIL REQUEST

export const changeEmailReqRequest = (email: string): AppActionTypes => ({
	type: "CHANGE_EMAIL_REQ_REQUEST",
	email,
});

export const changeEmailReqSuccess = (
	payload: EmailChangingProcess
): AppActionTypes => ({
	type: "CHANGE_EMAIL_REQ_SUCCESS",
	payload,
});

export const changeEmailReqFailure = (): AppActionTypes => ({
	type: "CHANGE_EMAIL_REQ_FAILURE",
});

// CHANGE EMAIL

export const changeEmailRequest = (otp: string): AppActionTypes => ({
	type: "CHANGE_EMAIL_REQUEST",
	otp,
});

export const changeEmailSuccess = (payload: ChangeEmail): AppActionTypes => ({
	type: "CHANGE_EMAIL_SUCCESS",
	payload,
});

export const changeEmailFailure = (): AppActionTypes => ({
	type: "CHANGE_EMAIL_FAILURE",
});

// CHANGE EMAIL ABORT

export const changeEmailAbortRequest = (): AppActionTypes => ({
	type: "CHANGE_EMAIL_ABORT_REQUEST",
});

export const changeEmailAbortSuccess = (
	payload: EmailChangingProcess
): AppActionTypes => ({
	type: "CHANGE_EMAIL_ABORT_SUCCESS",
	payload,
});

export const changeEmailAbortFailure = (): AppActionTypes => ({
	type: "CHANGE_EMAIL_ABORT_FAILURE",
});

// DELETE ACCOUNT

export const deleteAccountRequest = (password: string): AppActionTypes => ({
	type: "DELETE_ACCOUNT_REQUEST",
	password,
});

export const deleteAccountSuccess = (): AppActionTypes => ({
	type: "DELETE_ACCOUNT_SUCCESS",
});

export const deleteAccountFailure = (): AppActionTypes => ({
	type: "DELETE_ACCOUNT_FAILURE",
});

// CHANGE PASSWORD

export const changePasswordRequest = (
	payload: ChangePassword
): AppActionTypes => ({
	type: "CHANGE_PASSWORD_REQUEST",
	payload,
});

export const changePasswordSuccess = (
	lastTimeChanged: Date
): AppActionTypes => ({
	type: "CHANGE_PASSWORD_SUCCESS",
	lastTimeChanged,
});

export const changePasswordFailure = (): AppActionTypes => ({
	type: "CHANGE_PASSWORD_FAILURE",
});

// CHANGE PHOTO

export const changePhotoRequest = (avatar: FormData): AppActionTypes => ({
	type: "CHANGE_AVATAR_REQUEST",
	avatar,
});

export const changePhotoSuccess = (avatar: string): AppActionTypes => ({
	type: "CHANGE_AVATAR_SUCCESS",
	avatar,
});

export const changePhotoFailure = (): AppActionTypes => ({
	type: "CHANGE_AVATAR_FAILURE",
});

// CHANGE BIO

export const changeBioRequest = (bio: string): AppActionTypes => ({
	type: "CHANGE_BIO_REQUEST",
	bio,
});

export const changeBioSuccess = (bio: string): AppActionTypes => ({
	type: "CHANGE_BIO_SUCCESS",
	bio,
});

export const changeBioFailure = (): AppActionTypes => ({
	type: "CHANGE_BIO_FAILURE",
});

// CHANGE BIRTHDAY

export const changeBirthdayRequest = (
	payload: ChangeBirthday
): AppActionTypes => ({
	type: "CHANGE_BIRTHDAY_REQUEST",
	payload,
});

export const changeBirthdaySuccess = (birthday: Date): AppActionTypes => ({
	type: "CHANGE_BIRTHDAY_SUCCESS",
	birthday,
});

export const changeBirthdayFailure = (): AppActionTypes => ({
	type: "CHANGE_BIRTHDAY_FAILURE",
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

export const removeFromFriendsSuccess = (
	idOfUserToRemove: string
): AppActionTypes => ({
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

// WS action

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
