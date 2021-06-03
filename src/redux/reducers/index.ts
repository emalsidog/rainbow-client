// Dependencies
import { combineReducers } from "redux";

// Reducers
import { auth } from "./auth-reducer";
import { notifications } from "./notifications-reducer";
import { user } from "./user-reducer";
import { users } from "./users-reducer";

export const rootReducer = combineReducers({
	auth,
	notifications,
	user,
	users,
});
