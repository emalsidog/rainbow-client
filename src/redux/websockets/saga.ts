// Dependencies
import { call, take, put, takeEvery } from "redux-saga/effects";
import { EventChannel, eventChannel } from "redux-saga";
import { Action } from "redux";

// Actions
import { acceptFriendReqWS, cancelFriendReqWS, declineFriendReqWS, removeFromFriendsWS, sendFriendReqWS } from "../friends/actions";
import { addUserNotification } from "../notifications/actions";

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

export let websocket;

function initWebsocket(): EventChannel<any> {
	return eventChannel((emitter) => {
		/* 
			User id which will be setted after connection to server. This id is necessary to reconnect
			after loosing connection 
		*/
		let id: string | undefined;
		let intervalId: number;

		const initConnection = () => {
			const connectionUrl: string = "ws://localhost:4000";
			// const connectionUrl: string =
			// 	"wss://rainbow-server-api.herokuapp.com";

			let ws = new WebSocket(connectionUrl);
			websocket = ws;

			ws.onopen = () => {
				id && ws.send(JSON.stringify({ type: "GET_USER_ID", id }));

				intervalId = window.setInterval(() => {
					ws.send(JSON.stringify({ type: "PING" }));
				}, 30000);
			};

			ws.onerror = (error) => {
				console.log(`WebSocket error: ${error}`);
			};

			ws.onmessage = (e) => {
				let response;
				try {
					response = JSON.parse(e.data);
				} catch (error) {
					throw error;
				}

				switch (response.type) {
					case "CONNECTED_USER_ID": {
						return (id = response.id);
					}

					case "ONLINE_STATUS": {
						return emitter({
							type: "UPDATE_ONLINE_STATUS",
							payload: response.payload,
						});
					}

					case "ONLINE_CLIENTS": {
						return emitter({
							type: "GET_ONLINE_CLIENTS",
							clients: response.onlineClientsIds,
						});
					}

					case "CLOSE_CONNECTION": {
						id = undefined;
						clearInterval(intervalId);
						return ws.close();
					}

					// Chats

					case "ADD_MESSAGE": {
						return emitter({
							type: "ADD_MESSAGE_WS",
							message: response.payload,
						});
					}

					case "DELETE_MESSAGE": {
						return emitter({
							type: "DELETE_MESSAGE_WS",
							payload: response.payload,
						});
					}

					case "EDIT_MESSAGE": {
						return emitter({
							type: "EDIT_MESSAGE_WS",
							payload: response.payload,
						});
					}

					case "NEW_CHAT_CREATED": {
						return emitter({
							type: "CHAT_CREATED_WS",
							chat: response.payload,
						});
					}

					case "CHANGE_CHAT_PROCESS": {
						return emitter({
							type: "CHANGE_CHAT_PROCESS",
							payload: response.payload,
						});
					}

					// Posts

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
					
					// Friends

					case "FRIEND_REQUEST": {
						const { serverData, notification } = response.payload;
						emitter(sendFriendReqWS(serverData));
						return emitter(addUserNotification(notification));
					}

					case "FRIEND_REQUEST_ACCEPTED": {
						const { serverData, notification } = response.payload;
						emitter(acceptFriendReqWS(serverData));
						return emitter(addUserNotification(notification));
					}

					case "FRIEND_REQUEST_DECLINED": {
						const { serverData } = response.payload;
						return emitter(declineFriendReqWS(serverData));
					}

					case "FRIEND_REQUEST_CANCELLED": {
						const { serverData } = response.payload;
						return emitter(cancelFriendReqWS(serverData));
					}

					case "FRIEND_REMOVED": {
						const { removedFriendId } = response.payload;
						return emitter(removeFromFriendsWS(removedFriendId));
					}
				}
			};

			ws.onclose = (e) => {
				const reconnectIn: number = 3000;
				console.log(`Reconnect in: ${reconnectIn / 1000}s.`);
				intervalId && clearInterval(intervalId);
				id && setTimeout(initConnection, reconnectIn);
			};
		};

		initConnection();

		return () => {
			console.log("Socket off");
		};
	});
}
