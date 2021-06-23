// Dependencies
import { call, take, put, takeEvery } from "redux-saga/effects";
import { EventChannel, eventChannel } from "redux-saga";
import { Action } from "redux";

export function* wsWatcher() {
	yield takeEvery("LOGIN_SUCCESS", wsConnectionWorker);
}

function* wsConnectionWorker() {
	const channel: EventChannel<boolean> = yield call(initWebsocket);
	while (true) {
		const action: Action<any> = yield take(channel);
		yield put(action);
	}
}

function initWebsocket(): EventChannel<any> {
	return eventChannel((emitter) => {
		const initConnection = () => {
			let ws = new WebSocket("ws://localhost:4000");

			ws.onopen = () => {
				console.log("opening...");
				ws.send("hello server");
			};

			ws.onerror = (error) => {
				console.log("WebSocket error " + error);
				console.dir(error);
			};

			ws.onmessage = (e) => {
				let response;
				try {
					response = JSON.parse(e.data);
				} catch (error) {
					throw error;
				}

				switch (response.type) {
					case "NEW_POST_ADDED": {
						return emitter({
							type: "NEW_POST_ADDED",
							payload: response.payload,
						});
					}
					case "DELETE_POST": {
						return emitter({
							type: "DELETE_POST",
							postId: response.payload,
						});
					}
					case "POST_UPDATED": {
						return emitter({
							type: "POST_UPDATED",
							payload: response.payload,
						});
					}
					/* 
						"NEW_FRIEND_REQUEST" - responsible for updating client,
						which have got a notification (add currentUserId to friendRequests)
					*/
					case "FRIEND_REQUEST": {
						/* serverData: {
							currentUserId: string
						} */
						const { serverData, notification } = response.payload;
						emitter({
							type: "NEW_FRIEND_REQUEST",
							payload: serverData
						})
						return emitter({
							type: "ADD_USER_NOTIFICATION",
							payload: notification
						});
					}
					/* 
						UPDATE_USER_WHO_ACCEPTED - update client, which has been accepted by current user
						(find current user (who accepted) in users array and update it (add acceptedUserId to friends and
						remove it from requests)).
						===========================================================================
						UPDATE_FRIENDS_WHEN_ACCEPTED_REQUEST - update current user of client which was accepted
						(update user.user of client which was accepted) with new friends (add idOfUserWhoAccepted) and
						new requests (remove idOfUserWhoAccepted)
					*/
					case "FRIEND_REQUEST_ACCEPTED": {
						/*
							serverData: {
								idOfUserWhoAccepted: string,
								acceptedUserId: string
							}
						*/
						const { serverData, notification } = response.payload;
						emitter({ 
							type: "UPDATE_FRIENDS_WHEN_ACCEPTED_REQUEST",
							newFriendId: serverData.idOfUserWhoAccepted
						});
						emitter({
							type: "UPDATE_USER_WHO_ACCEPTED",
							payload: serverData
						})
						return emitter({
							type: "ADD_USER_NOTIFICATION",
							payload: notification
						})
					}
				}
			};

			ws.onclose = (e) => {
				console.log("Reconnect in 4s");
				setTimeout(initConnection, 4000);
			};
		};

		initConnection();

		return () => {
			console.log("Socket off");
		};
	});
}
