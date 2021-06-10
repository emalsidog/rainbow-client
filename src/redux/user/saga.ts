// Dependencies
import { takeEvery, call, put } from "redux-saga/effects";

// Actions
import * as userActions from "./actions";
import { loginSuccess, logoutSuccess } from "../auth/actions";
import { addNotification } from "../notifications/actions";

// Utils
import { AxiosGetRequest, AxiosPostRequest } from "../utils/server-request";

// Types
import {
	ChangeNameRequest,
	ChangeProfileIdRequest,
	ChangeEmailReqRequest,
	ChangeEmailRequest,
	DeleteAccountRequest,
	ChangePasswordRequest,
	ChangeAvatarRequest,
	ChangeBioRequest,
	ChangeBirthdayRequest,
} from "./types";
import { UserExtended } from "./types";

// Watcher
export function* userWatcher() {
	yield takeEvery("GET_USER_REQUEST", currentUser);
	yield takeEvery("CHANGE_NAME_REQUEST", changeName);
	yield takeEvery("CHANGE_PROFILE_ID_REQUEST", changeProfileId);

	yield takeEvery("CHANGE_EMAIL_REQ_REQUEST", changeEmailRequest);
	yield takeEvery("CHANGE_EMAIL_REQUEST", changeEmail);
	yield takeEvery("CHANGE_EMAIL_ABORT_REQUEST", changeEmailAbort);
	yield takeEvery("CHANGE_PASSWORD_REQUEST", changePassword);
	yield takeEvery("CHANGE_AVATAR_REQUEST", changeAvatar);
	yield takeEvery("CHANGE_BIO_REQUEST", changeBio);
	yield takeEvery("CHANGE_BIRTHDAY_REQUEST", changeBirthday);

	yield takeEvery("DELETE_ACCOUNT_REQUEST", deleteAccount);
}

function* currentUser() {
	try {
		const { data } = yield call(() =>
			AxiosGetRequest("/authentication/current-user")
		);
		const { user, changingEmailProcess } = data.body;
		
		const payload: UserExtended = {
			user: {
				...user,
			},
			emailChangingProcess: {
				...changingEmailProcess,
			},
		};

		yield put(userActions.setUser(payload));
		yield put(loginSuccess());
		yield put(userActions.getUserSuccess());
	} catch (error) {
		yield put(userActions.getUserFailure());
	}
}

function* changeName(action: ChangeNameRequest) {
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/settings/change-name", action.payload)
		);
		const { body, status } = data;

		yield put(userActions.changeNameSuccess(body));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(userActions.changeNameFailure());
		yield put(addNotification(status));
	}
}

function* changeProfileId(action: ChangeProfileIdRequest) {
	const payload = { profileId: action.profileId };
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/settings/change-profileId", payload)
		);
		const {
			body: { profileId },
			status,
		} = data;

		yield put(userActions.changeProfileIdSuccess(profileId));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(userActions.changeProfileIdFailure());
		yield put(addNotification(status));
	}
}

function* changeEmailRequest(action: ChangeEmailReqRequest) {
	const payload = { email: action.email };
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/settings/change-email-request", payload)
		);
		const { body, status } = data;

		yield put(userActions.changeEmailReqSuccess(body));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(userActions.changeEmailReqFailure());
		yield put(addNotification(status));
	}
}

function* changeEmail(action: ChangeEmailRequest) {
	const payload = { otp: action.otp };
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/settings/change-email", payload)
		);
		const { body, status } = data;

		yield put(userActions.changeEmailSuccess(body));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(userActions.changeEmailFailure());
		yield put(addNotification(status));
	}
}

function* changeEmailAbort() {
	try {
		const { data } = yield call(() =>
			AxiosGetRequest("/settings/change-email-abort")
		);
		const { body, status } = data;

		yield put(userActions.changeEmailAbortSuccess(body));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(userActions.changeEmailAbortFailure());
		yield put(addNotification(status));
	}
}

function* deleteAccount(action: DeleteAccountRequest) {
	const payload = { password: action.password };
	try {
		const {
			data: { status },
		} = yield call(() => AxiosPostRequest("/settings/delete", payload));

		yield put(logoutSuccess());
		yield put(userActions.deleteAccountSuccess());
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(userActions.deleteAccountFailure());
		yield put(addNotification(status));
	}
}

function* changePassword(action: ChangePasswordRequest) {
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/settings/change-password", action.payload)
		);
		const {
			body: { lastTimeChanged },
			status,
		} = data;

		yield put(userActions.changePasswordSuccess(lastTimeChanged));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(userActions.changePasswordFailure());
		yield put(addNotification(status));
	}
}

function* changeAvatar(action: ChangeAvatarRequest) {
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/settings/change-avatar", action.avatar)
		);
		const { body, status } = data;

		yield put(userActions.changePhotoSuccess(body.avatar));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(userActions.changePhotoFailure());
		yield put(addNotification(status));
	}
}

function* changeBio(action: ChangeBioRequest) {
	const payload = { bio: action.bio };
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/settings/change-bio", payload)
		);
		const { body, status } = data;

		yield put(userActions.changeBioSuccess(body.bio));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(userActions.changeBioFailure());
		yield put(addNotification(status));
	}
}

function* changeBirthday(action: ChangeBirthdayRequest) {
	try {
		const { data } = yield call(() => AxiosPostRequest("/settings/change-birthday", action.payload));
		const { body, status } = data;

		yield put(userActions.changeBirthdaySuccess(body.birthday));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(userActions.changeBirthdayFailure());
		yield put(addNotification(status));
	}
}