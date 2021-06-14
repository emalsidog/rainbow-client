// Dependencies
import { takeEvery, call, put } from "redux-saga/effects";

// Actions
import * as usersActions from "./actions";
import { addNotification } from "../notifications/actions";

// Utils
import { AxiosGetRequest, AxiosPostRequest } from "../utils/server-request";

// Types
import { GetUseByIdRequest, SearchUserRequest } from "./types";

// Watcher
export function* usersWatcher() {
	yield takeEvery("GET_USER_BY_ID_REQUEST", getUser);
	yield takeEvery("SEARCH_USER_REQUEST", searchUser);
}

function* getUser(action: GetUseByIdRequest) {
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

function* searchUser(action: SearchUserRequest) {
	try {
		const { data } = yield AxiosPostRequest("/users/search", action.payload);
		yield put(usersActions.searchUserSuccess(data.body.users));
	} catch (error) {
		yield put(usersActions.searchUserFailure());
	}
}