// Dependencies
import { takeEvery, call, put } from "redux-saga/effects";

// Actions
import * as usersActions from "./actions";
import { addNotification } from "../notifications/actions";

// Utils
import { AxiosGetRequest, AxiosPostRequest } from "../utils/server-request";

// Types
import { GetUserByIdRequest, SearchUsersRequest } from "./types";

// Watcher
export function* usersWatcher() {
	yield takeEvery("GET_USER_BY_ID_REQUEST", getUser);
	yield takeEvery("SEARCH_USERS_REQUEST", searchUsers);
}

function* getUser(action: GetUserByIdRequest) {
	try {
		const {
			data: { body },
		} = yield call(() => AxiosGetRequest(`/users/${action.profileId}`));

		yield put(usersActions.getUserByIdSuccess(body));
	} catch (error) {
		const status = error.response.data;
		yield put(usersActions.getUserByIdFailure());
		yield put(addNotification(status));
	}
}

function* searchUsers(action: SearchUsersRequest) {
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/users/search", action.payload)
		);

		yield put(usersActions.searchUsersSuccess(data.body));
	} catch (error) {
		yield put(usersActions.searchUsersFailure());
	}
}