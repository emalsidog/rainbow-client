// Dependencies
import { takeEvery, call, put } from "redux-saga/effects";

// Actions
import * as usersActions from "../actions/users-actions";
import { addNotification } from "../actions/notifications-actions";

// Utils
import { AxiosGetRequest } from "../utils/server-request";

// Types
import { GetUseByIdRequest } from "../actions/types/users-actions-types/users-actions-types";

// Watcher
export function* usersWatcher() {
	yield takeEvery("GET_USER_BY_ID_REQUEST", getUser);
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