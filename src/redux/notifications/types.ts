const ADD_NOTIFICATION = "ADD_NOTIFICATION";
const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";

const ADD_USER_NOTIFICATION = "ADD_USER_NOTIFICATION";
const REMOVE_USER_NOTIFICATION = "REMOVE_USER_NOTIFICATION";

const FRIEND_REQUEST = "FRIEND_REQUEST";
const FRIEND_REQUEST_ACCEPTED = "FRIEND_REQUEST_ACCEPTED";

// COMMON TYPES

export interface Notify {
	isError: boolean;
	message: string;
}

// SYSTEM NOTIFICATIONS

interface AddNotification {
	type: typeof ADD_NOTIFICATION;
	payload: Notify;
}

interface RemoveNotification {
	type: typeof REMOVE_NOTIFICATION;
	id: string;
}

// USER NOTIFICATIONS

// Notification types

interface FriendRequest {
	id?: string;
	type: typeof FRIEND_REQUEST,
	data: {
		displayName: string;
		profileId: string;
	}
}

interface FriendRequestAccepted {
	id?: string;
	type: typeof FRIEND_REQUEST_ACCEPTED,
	data: {
		displayName: string;
	}
}

// Action types

interface AddUserNotification {
	type: typeof ADD_USER_NOTIFICATION;
	payload: UserNotificationTypes;
}

interface RemoveUserNotification {
	type: typeof REMOVE_USER_NOTIFICATION;
	id: string;
}

export type UserNotificationTypes = FriendRequest | FriendRequestAccepted

export type NotificationActionTypes =
	| AddNotification
	| RemoveNotification
	| AddUserNotification
	| RemoveUserNotification;
