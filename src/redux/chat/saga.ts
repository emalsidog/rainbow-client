// Dependencies
import { call, takeEvery, put } from "redux-saga/effects";

// Actions
import * as chatsActions from "./actions";

// Utils
import { AxiosGetRequest } from "../utils/server-request";

// Watcher
export function* chatsWatcher() {
	yield takeEvery("GET_CHATS_REQUEST", getChats);
}

// Workers

// GET CHATS
function* getChats() {
	try {
		const { data } = yield call(() => AxiosGetRequest("/chats"));

		const { body } = data;

		yield put(chatsActions.getChatsSuccess(body.chats));
	} catch (error) {
		yield put(chatsActions.getChatsFailure());
	}
}
