// Dependencies
import { combineReducers } from "redux";

// Reducers
import { auth } from "./auth-reducer";
import { notifications } from "./notifications-reducer";
import { user } from "./user-reducer";

export const rootReducer = combineReducers({ auth, notifications, user });
