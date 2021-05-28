// Dependencies
import { v4 } from "uuid";

// Types
import { NotificationActionTypes } from "../actions/types/notifications-actions-types/notifications-actions-types";
import { Notify } from "../actions/types/notifications-actions-types/notifications-common-types";

interface Notifications extends Notify {
	id: string;
}

interface InitialState {
	notifications: Notifications[];
}

const initialState: InitialState = {
	notifications: [],
};

export const notifications = (
	state = initialState,
	action: NotificationActionTypes
): InitialState => {
	switch (action.type) {
		case "ADD_NOTIFICATION": {
			return {
				...state,
				notifications: [
					...state.notifications,
					{ ...action.payload, id: v4() },
				],
			};
		}
		case "REMOVE_NOTIFICATION": {
            return {
				...state,
				notifications: state.notifications.filter(
					(notify) => notify.id !== action.id
				),
			};
		}
		default:
			return {
				...state,
			};
	}
};
