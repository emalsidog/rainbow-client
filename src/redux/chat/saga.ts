// Dependencies
import { call, takeEvery, put } from "redux-saga/effects";

// Actions
import * as chatsActions from "./actions";
import { addNotification } from "../notifications/actions";

// Utils
import { AxiosGetRequest, AxiosPostRequest } from "../utils/server-request";

// Types
import { CreateChatRequest } from "./types";

// Watcher
export function* chatsWatcher() {
	yield takeEvery("GET_CHATS_REQUEST", getChats);
	yield takeEvery("CREATE_CHAT_REQUEST", createChat);
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

// CREATE NEW CHAT
function* createChat(action: CreateChatRequest) {
	const payload = {
		participants: [...action.participants],
	};
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/chats/create", payload)
		);
	} catch (error) {
		const { status } = error.response.data;
		yield put(chatsActions.createChatFailure());
		yield put(addNotification(status));
	}
}
