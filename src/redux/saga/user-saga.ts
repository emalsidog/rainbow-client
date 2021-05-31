// Dependencies
import { takeEvery, call, put } from "redux-saga/effects";

// Actions
import * as userActions from "../actions/user-actions";
import { loginSuccess, logoutSuccess } from "../actions/auth-actions";
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
} from "../actions/types/user-actions-types/user-actions-types";
import { UserExtended } from "../actions/types/user-actions-types/user-common-types";

// Watcher
export function* userWatcher() {
	yield takeEvery("GET_USER_REQUEST", currentUser);
	yield takeEvery("CHANGE_NAME_REQUEST", changeName);
	yield takeEvery("CHANGE_PROFILE_ID_REQUEST", changeProfileId);

	yield takeEvery("CHANGE_EMAIL_REQ_REQUEST", changeEmailRequest);
	yield takeEvery("CHANGE_EMAIL_REQUEST", changeEmail);
	yield takeEvery("CHANGE_EMAIL_ABORT_REQUEST", changeEmailAbort);
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
		const { data: { status } } = yield call(() => AxiosPostRequest("/settings/delete", payload));

		yield put(logoutSuccess());
		yield put(userActions.deleteAccountSuccess());
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(userActions.deleteAccountFailure());
		yield put(addNotification(status));	
	}
}