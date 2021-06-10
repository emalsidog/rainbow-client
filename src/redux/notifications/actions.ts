// Types
import { Notify } from "./types";
import { AppActionTypes } from "../common-types";

export const addNotification = (payload: Notify): AppActionTypes => ({
	type: "ADD_NOTIFICATION",
	payload,
});

export const removeNotification = (id: string): AppActionTypes => ({
	type: "REMOVE_NOTIFICATION",
	id,
});
