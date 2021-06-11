// Dependencies
import { takeEvery, call, put } from "redux-saga/effects";

// Actions
import * as postsActions from "./actions";
import { addNotification } from "../notifications/actions";

// Utils
import { AxiosPostRequest } from "../utils/server-request";

// Types
import { AddPostRequest, DeletePostRequest, EditPostRequest } from "./types";

// Watcher
export function* postsWatcher() {
    yield takeEvery("ADD_POST_REQUEST", addPost);
    yield takeEvery("DELETE_POST_REQUEST", deletePost);
    yield takeEvery("EDIT_POST_REQUEST", editPost);
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

function* deletePost(action: DeletePostRequest) {
    const payload = { postId: action.postId };
    try {
        const { data } = yield call(() => AxiosPostRequest("/posts/delete-post", payload));
        const { body, status } = data;

        yield put(postsActions.deletePostSuccess(body.postToDelete));
        yield put(addNotification(status));
    } catch (error) {
        const { status } = error.response.data;
        yield put(postsActions.deletePostFailure());
        yield put(addNotification(status));
    }
}

function* editPost(action: EditPostRequest) {
    try {
        const { data } = yield call(() => AxiosPostRequest("/posts/edit-post", action.payload));
        const { body, status } = data;

        yield put(postsActions.editPostSuccess(body.updatedPost));
        yield put(addNotification(status));
    } catch (error) {
        const { status } = error.response.data;
        yield put(postsActions.editPostFailure());
        yield put(addNotification(status));
    }
}