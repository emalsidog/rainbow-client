// Dependencies
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

// Root reducer
import { rootReducer } from "./reducers";

// Root watcher
import { rootWatcher } from "./saga";

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
