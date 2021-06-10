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
			let response = JSON.parse(e.data);
            console.log(response)
		};

		return () => {
			console.log("Socket off");
		};
	});
}
