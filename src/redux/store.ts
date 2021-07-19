// Dependencies
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { all } from "redux-saga/effects";

// Reducers
import { user } from "./user";
import { auth } from "./auth";
import { notifications } from "./notifications";
import { posts } from "./posts";
import { chats } from "./chat/reducer";

// Watchers
import { userWatcher } from "./user";
import { authWatcher } from "./auth";
import { wsWatcher } from "./websockets";
import { postsWatcher } from "./posts";
import { friendsWatcher } from "./friends";
import { chatsWatcher } from "./chat/saga";

// Root reducer
export const rootReducer = combineReducers({
	auth,
	notifications,
	user,
	posts,
	chats,
});

// Root watcher
function* rootWatcher() {
	yield all([
		authWatcher(),
		userWatcher(),
		wsWatcher(),
		postsWatcher(),
		friendsWatcher(),
		chatsWatcher(),
	]);
}

// Main store type
export type RootState = ReturnType<typeof rootReducer>;

// Saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootWatcher);

export { store };
