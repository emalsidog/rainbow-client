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
			const connectionUrl: string = "ws://localhost:4000" 
			// const connectionUrl: string = "wss://rainbow-server-api.herokuapp.com"
				
			let ws = new WebSocket(connectionUrl);

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
						NEW_FRIEND_REQUEST - responsible for updating client,
						which have got a notification (add currentUserId to friendRequests)
					*/
					case "FRIEND_REQUEST": {
						/* serverData: {
							currentUserId: string,
							requestsCount: number
						} */
						const { serverData, notification } = response.payload;
						emitter({
							type: "NEW_FRIEND_REQUEST",
							payload: serverData
						});
						emitter({
							type: "UPDATE_REQUEST_COUNTER",
							count: serverData.requestsCount
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
					/* 
						FRIEND_REQUEST_DECLINED - after some client have declined request, update array of users
						in client, whis has been rejected. 
					*/
					case "FRIEND_REQUEST_DECLINED": {
						/*
							serverData: {
								declinedRequestId: string;
							}
						*/
						const { serverData } = response.payload;
						return emitter({
							type: "FRIEND_REQUEST_DECLINED",
							payload: serverData
						})
					}
					/*
						FRIEND_REQUEST_CANCELLED - after some client has cancelled its request - update client (user.user)
						who	had this request by removing idOfUserWhoCancelled from the friendRequests
					*/
					case "FRIEND_REQUEST_CANCELLED": {
						/*
							serverData: {
								idOfUserWhoCancelled: string;
							}
						*/
						const { serverData } = response.payload;
						emitter({
							type: "UPDATE_REQUEST_COUNTER",
							count: serverData.requestsCount
						})
						return emitter({
							type: "FRIEND_REQUEST_CANCELLED",
							idOfUserWhoCancelled: serverData.idOfUserWhoCancelled
						});
					}
					/*
						FRIEND_REMOVED - When one client removed another one - on the deleted user remove 
						id of user who have deleted this client
						============================================================================
						REMOVE_FROM_FRIENDS - Clear friends array in users.users
					*/
					case "FRIEND_REMOVED": {
						const { serverData } = response.payload;
						emitter({
							type: "REMOVE_FROM_FRIENDS",
							payload: serverData
						});
						return emitter({
							type: "REMOVE_FROM_FRIENDS_SUCCESS",
							idOfUserToRemove: serverData.idOfUserToRemove
						});
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
