// Dependencies
import { takeEvery, call, put } from "redux-saga/effects";

// Actions
import * as postsActions from "./actions";
import { addNotification } from "../notifications/actions";

// Utils
import { AxiosPostRequest } from "../utils/server-request";

// Types
import { AddPostRequest } from "./types";

// Watcher
export function* postsWatcher() {
    yield takeEvery("ADD_POST_REQUEST", addPost);
}

function* addPost(action: AddPostRequest) {
    try {
        const { data } = yield call(() => AxiosPostRequest("/posts/add-post", action.payload));
        const { body, status } = data;

        yield put(postsActions.addPostSuccess(body.post));
        yield put(addNotification(status));
    } catch (error) {
        const { status } = error.response.data;
		yield put(postsActions.addPostFailure());
		yield put(addNotification(status));
    }
}