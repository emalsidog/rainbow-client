const ADD_NOTIFICATION = "ADD_NOTIFICATION";
const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";

export interface Notify {
	isError: boolean;
	message: string;
}

interface AddNotification {
	type: typeof ADD_NOTIFICATION;
	payload: Notify;
}

interface RemoveNotification {
	type: typeof REMOVE_NOTIFICATION;
	id: string;
}

export type NotificationActionTypes = AddNotification | RemoveNotification;
