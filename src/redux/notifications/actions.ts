// Types
import { Notify, UserNotificationTypes } from "./types";
import { AppActionTypes } from "../common-types";

export const addNotification = (payload: Notify): AppActionTypes => ({
	type: "ADD_NOTIFICATION",
	payload,
});

export const removeNotification = (id: string): AppActionTypes => ({
	type: "REMOVE_NOTIFICATION",
	id,
});

export const addUserNotification = (payload: UserNotificationTypes): AppActionTypes => ({
	type: "ADD_USER_NOTIFICATION",
	payload,
});

export const removeUserNotification = (id: string): AppActionTypes => ({
	type: "REMOVE_USER_NOTIFICATION",
	id,
});
