// Dependencies
import { takeEvery, call, put } from "redux-saga/effects";

// Actions
import * as authActions from "../actions/auth-actions";
import { setUser } from "../actions/user-actions";
import { addNotification } from "../actions/notifications-actions";

// Utils
import { AxiosGetRequest, AxiosPostRequest } from "../utils/server-request";

// Types
import {
	RegisterRequest,
	LoginRequest,
	ActivateRequest,
	ForgotRequest,
	ResetRequest,
} from "../actions/types/auth-actions-types/auth-actions-types";

// Watcher
export function* authWatcher() {
	yield takeEvery("REGISTER_REQUEST", register);
	yield takeEvery("LOGIN_REQUEST", login);
	yield takeEvery("ACTIVATE_REQUEST", activate);
	yield takeEvery("LOGOUT_REQUEST", logout);
	yield takeEvery("FORGOT_REQUEST", forgot);
	yield takeEvery("RESET_REQUEST", reset);
}

function* register(action: RegisterRequest) {
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/authentication/register", action.payload)
		);

		yield put(authActions.registerSuccess());
		yield put(addNotification(data.status));
	} catch (error) {
		yield put(authActions.registerFailure());
		yield put(addNotification(error.response.data.status));
	}
}

function* login(action: LoginRequest) {
	try {
		const { data: { body } } = yield call(() =>
			AxiosPostRequest("/authentication/login", action.payload)
		);

		yield put(setUser(body));
		yield put(authActions.loginSuccess());
	} catch (error) {
		yield put(authActions.loginFailure());
		yield put(addNotification(error.response.data.status));
	}
}

function* activate(action: ActivateRequest) {
	const payload = {
		activationToken: action.activationToken,
	};

	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/authentication/activate", payload)
		);

		yield put(authActions.activateSuccess(data.status));
		yield put(addNotification(data.status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(authActions.activateFailure(status));
		yield put(addNotification(status));
	}
}

function* logout() {
	try {
		const { data } = yield call(() =>
			AxiosGetRequest("/authentication/logout")
		);
		const status = data.status;

		yield put(authActions.logoutSuccess());
		yield put(addNotification(status));
	} catch (error) {
		yield put(authActions.logoutFailure());
		yield put(addNotification(error.response.data.status));
	}
}

function* forgot(action: ForgotRequest) {
	const timeToNextEmail = localStorage.getItem("timeToNextEmail");

	const payload = {
		email: action.email,
		timeToNextEmail,
	};

	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/authentication/forgot", payload)
		);
		const { body, status } = data;

		localStorage.setItem("timeToNextEmail", `${body.timeToNextEmail}`);

		yield put(authActions.forgotSuccess());
		yield put(addNotification(status));
	} catch (error) {
		yield put(authActions.forgotFailure());
		yield put(addNotification(error.response.data.status));
	}
}

function* reset(action: ResetRequest) {
	const { payload } = action;
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/authentication/reset", payload)
		);
		const { status } = data;

		yield put(authActions.resetSuccess(status));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(authActions.resetFailure(status));
		yield put(addNotification(status));
	}
}
