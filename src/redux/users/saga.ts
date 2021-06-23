// Dependencies
import { takeEvery, call, put } from "redux-saga/effects";

// Actions
import * as usersActions from "./actions";
import { updateFriendsWhenAcceptedRequest } from "../user/actions";
import { addNotification } from "../notifications/actions";

// Utils
import { AxiosGetRequest, AxiosPostRequest } from "../utils/server-request";

// Types
import {
	AcceptFriendReqRequest,
	CancelFriendReqRequest,
	DeclineFriendReqRequest,
	GetUserByIdRequest,
	RemoveFromFriendsRequest,
	SearchUsersRequest,
	SendFriendReqRequest,
} from "./types";

// Watcher
export function* usersWatcher() {
	yield takeEvery("GET_USER_BY_ID_REQUEST", getUser);
	yield takeEvery("SEARCH_USERS_REQUEST", searchUsers);

	yield takeEvery("SEND_FRIEND_REQ_REQUEST", sendFriendRequest);
	yield takeEvery("ACCEPT_FRIEND_REQ_REQUEST", acceptFriendRequest);
	yield takeEvery("DECLINE_FRIEND_REQ_REQUEST", declineFriendRequest);
	yield takeEvery("CANCEL_FRIEND_REQ_REQUEST", cancelFriendRequest);
	yield takeEvery("REMOVE_FROM_FRIENDS_REQUEST", removeFromFriends);
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

function* sendFriendRequest(action: SendFriendReqRequest) {
	const payload = { profileId: action.profileId };
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/friends/friend-request", payload)
		);

		const { status, body } = data;

		yield put(usersActions.sendFriendReqSuccess(body));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(usersActions.sendFriendReqFailure());
		yield put(addNotification(status));
	}
}

function* acceptFriendRequest(action: AcceptFriendReqRequest) {
	const payload = { id: action.id };
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/friends/accept-friend-request", payload)
		);
		const { body, status } = data;

		yield put(usersActions.acceptFriendReqSuccess());
		yield put(updateFriendsWhenAcceptedRequest(body.newFriendId));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(usersActions.acceptFriendReqFailure());
		yield put(addNotification(status));
	}
}

// decline remove cancel

function* declineFriendRequest(action: DeclineFriendReqRequest) {
	const payload = { id: action.id };
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/friends/decline-friend-request", payload)
		);
		const { status } = data;

		yield put(usersActions.declineFriendReqSuccess());
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(usersActions.declineFriendReqFailure());
		yield put(addNotification(status));
	}
}

function* cancelFriendRequest(action: CancelFriendReqRequest) {
	const payload = { id: action.id };
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/friends/cancel-friend-request", payload)
		);
		const { status } = data;

		yield put(usersActions.cancelFriendReqSuccess());
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(usersActions.cancelFriendReqFailure());
		yield put(addNotification(status));
	}
}

function* removeFromFriends(action: RemoveFromFriendsRequest) {
	const payload = { id: action.id };
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/friends/remove-friend", payload)
		);
		const { status } = data;

		yield put(usersActions.removeFromFriendsSuccess());
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(usersActions.removeFromFriendsFailure());
		yield put(addNotification(status));
	}
}
