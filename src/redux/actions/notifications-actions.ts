// Types
import { Notify } from "./types/notifications-actions-types/notifications-common-types";
import { AppActionTypes } from "./types";

export const addNotification = (payload: Notify): AppActionTypes => ({
	type: "ADD_NOTIFICATION",
	payload,
});

export const removeNotification = (id: string): AppActionTypes => ({
	type: "REMOVE_NOTIFICATION",
	id,
});
