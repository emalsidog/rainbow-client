// Dependencies
import { takeEvery, call, put } from "redux-saga/effects";

// Actions
import { addNotification } from "../notifications/actions";
import * as friendsActions from "../friends/actions";

// Utils
import { AxiosPostRequest } from "../utils/server-request";

// Types
import {
    AcceptFriendReqRequest,
	CancelFriendReqRequest,
	SendFriendReqRequest,
	DeclineFriendReqRequest,
	RemoveFromFriendsRequest,
	GetPopulatedFriendRequestsRequest,
	GetPopulatedFriendsRequest,
} from "../friends/types";

// Watcher
export function* friendsWatcher() {
	yield takeEvery("GET_POPULATED_FRIENDS_REQUEST", getPopulatedFriends);
	yield takeEvery("GET_POPULATED_FRIEND_REQUESTS_REQUEST", getPopulatedFriendRequests);

    yield takeEvery("SEND_FRIEND_REQ_REQUEST", sendFriendRequest);
	yield takeEvery("ACCEPT_FRIEND_REQ_REQUEST", acceptFriendRequest);
	yield takeEvery("CANCEL_FRIEND_REQ_REQUEST", cancelFriendRequest);
	yield takeEvery("DECLINE_FRIEND_REQ_REQUEST", declineFriendRequest);
	yield takeEvery("REMOVE_FROM_FRIENDS_REQUEST", removeFromFriends);
}

function* sendFriendRequest(action: SendFriendReqRequest) {
	const payload = { profileId: action.profileId };
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/friends/friend-request", payload)
		);

		const { status, body } = data;

		yield put(friendsActions.sendFriendReqSuccess(body));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(friendsActions.sendFriendReqFailure());
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

		yield put(friendsActions.acceptFriendReqSuccess());
		yield put(friendsActions.updateRequestsCounter(body.requestsCount))
		yield put(friendsActions.updateFriendsWhenAcceptedRequest(body.newFriendId));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(friendsActions.acceptFriendReqFailure());
		yield put(addNotification(status));
	}
}

function* cancelFriendRequest(action: CancelFriendReqRequest) {
	const payload = { id: action.id };
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/friends/cancel-friend-request", payload)
		);
		const { body, status } = data;

		yield put(friendsActions.cancelFriendReqSuccess(body));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(friendsActions.cancelFriendReqFailure());
		yield put(addNotification(status));
	}
}

function* declineFriendRequest(action: DeclineFriendReqRequest) {
	const payload = { id: action.id };
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/friends/decline-friend-request", payload)
		);
		const { body, status } = data;

		yield put(friendsActions.declineFriendReqSuccess(body.declinedRequestId));
		yield put(friendsActions.updateRequestsCounter(body.requestsCount));
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(friendsActions.declineFriendReqFailure());
		yield put(addNotification(status));
	}
}

function* removeFromFriends(action: RemoveFromFriendsRequest) {
	const payload = { id: action.id };
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/friends/remove-friend", payload)
		);
		const { body, status } = data;

		yield put(friendsActions.removeFromFriendsSuccess(body.idOfUserToRemove));
		yield put({ type: "REMOVE_FROM_FRIENDS", payload: body });
		yield put(addNotification(status));
	} catch (error) {
		const { status } = error.response.data;
		yield put(friendsActions.removeFromFriendsFailure());
		yield put(addNotification(status));
	}
}

function* getPopulatedFriends(action: GetPopulatedFriendsRequest) {
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/friends", action.payload)
		);
		const { body } = data;

		yield put(friendsActions.getPopulatedFriendsSuccess(body));
	} catch (error) {
		const { status } = error.response.data;
		yield put(friendsActions.getPopulatedFriendsFailure());
		yield put(addNotification(status));
	}
}

function* getPopulatedFriendRequests(
	action: GetPopulatedFriendRequestsRequest
) {
	const { requestOptions } = action;
	try {
		const { data } = yield call(() =>
			AxiosPostRequest("/friends/requests", { requestOptions })
		);
		const { body } = data;

		yield put(friendsActions.getPopulatedFriendRequestsSuccess(body));
	} catch (error) {
		const { status } = error.response.data;
		yield put(friendsActions.getPopulatedFriendRequestsFailure());
		yield put(addNotification(status));
	}
}
