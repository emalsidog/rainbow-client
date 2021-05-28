// Dependencies
import { all } from "redux-saga/effects";

// Watchers
import { authWatcher } from "./auth-saga";
import { userWatcher } from "./user-saga";

export function* rootWatcher() {
	yield all([authWatcher(), userWatcher()]);
}
