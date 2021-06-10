// Dependencies
import { takeEvery, call, put } from "redux-saga/effects";

// Actions
import * as settingsActions from "../actions/settings-actions";
import { logoutSuccess } from "../actions/auth-actions";
import { addNotification } from "../actions/notifications-actions";

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
} from "../actions/types/settings-actions-types/settings-actions-types";

// Watcher
export function* settingsWatcher() {
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


function* changeName(action: ChangeNameRequest) {
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/settings/change-name", action.payload)
		);
		const { body, status } = data;

		yield put(settingsActions.changeNameSuccess(body));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(settingsActions.changeNameFailure());
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

		yield put(settingsActions.changeProfileIdSuccess(profileId));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(settingsActions.changeProfileIdFailure());
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

		yield put(settingsActions.changeEmailReqSuccess(body));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(settingsActions.changeEmailReqFailure());
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

		yield put(settingsActions.changeEmailSuccess(body));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(settingsActions.changeEmailFailure());
		yield put(addNotification(status));
	}
}

function* changeEmailAbort() {
	try {
		const { data } = yield call(() =>
			AxiosGetRequest("/settings/change-email-abort")
		);
		const { body, status } = data;

		yield put(settingsActions.changeEmailAbortSuccess(body));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(settingsActions.changeEmailAbortFailure());
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
		yield put(settingsActions.deleteAccountSuccess());
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(settingsActions.deleteAccountFailure());
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

		yield put(settingsActions.changePasswordSuccess(lastTimeChanged));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(settingsActions.changePasswordFailure());
		yield put(addNotification(status));
	}
}

function* changeAvatar(action: ChangeAvatarRequest) {
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/settings/change-avatar", action.avatar)
		);
		const { body, status } = data;

		yield put(settingsActions.changePhotoSuccess(body.avatar));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(settingsActions.changePhotoFailure());
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

		yield put(settingsActions.changeBioSuccess(body.bio));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(settingsActions.changeBioFailure());
		yield put(addNotification(status));
	}
}

function* changeBirthday(action: ChangeBirthdayRequest) {
	try {
		const { data } = yield call(() => AxiosPostRequest("/settings/change-birthday", action.payload));
		const { body, status } = data;

		yield put(settingsActions.changeBirthdaySuccess(body.birthday));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(settingsActions.changeBirthdayFailure());
		yield put(addNotification(status));
	}
}