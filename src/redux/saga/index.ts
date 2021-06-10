// Dependencies
import { all } from "redux-saga/effects";

// Watchers
import { authWatcher } from "./auth-saga";
import { userWatcher } from "./user-saga";
import { usersWatcher } from "./users-saga";
import { settingsWatcher } from "./settings-saga";
import { wsWatcher } from "./websockets";

export function* rootWatcher() {
	yield all([
		authWatcher(),
		userWatcher(),
		usersWatcher(),
		settingsWatcher(),
		wsWatcher(),
	]);
}
