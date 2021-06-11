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
			}
		};

		return () => {
			console.log("Socket off");
		};
	});
}
