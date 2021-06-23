// Types
import { AppActionTypes } from "../common-types";
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

export const changeEmailReqSuccess = (payload: EmailChangingProcess): AppActionTypes => ({
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

export const changeEmailAbortSuccess = (payload: EmailChangingProcess): AppActionTypes => ({
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

export const changePasswordRequest = (payload: ChangePassword): AppActionTypes => ({
	type: "CHANGE_PASSWORD_REQUEST",
	payload,
});

export const changePasswordSuccess = (lastTimeChanged: Date): AppActionTypes => ({
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

export const changeBirthdayRequest = (payload: ChangeBirthday): AppActionTypes => ({
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

// WS action

export const updateFriendsWhenAcceptedRequest = (newFriendId: string) => ({
	type: "UPDATE_FRIENDS_WHEN_ACCEPTED_REQUEST",
	newFriendId
})

