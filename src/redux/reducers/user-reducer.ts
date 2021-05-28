// Types
import {
	IsLoading,
	User,
	EmailChangingProcess,
} from "../actions/types/user-actions-types/user-common-types";
import { UserActionTypes } from "../actions/types/user-actions-types/user-actions-types";

interface InitialState {
	user: User;
	isFetching: boolean;

	emailChangingProcess: EmailChangingProcess;

	isLoading: IsLoading;
}

const initialState: InitialState = {
	user: {
		givenName: "",
		familyName: "",
		email: "",
		profileId: "",
	},
	isFetching: true,

	emailChangingProcess: {
		timeToNextEmail: undefined,
		isChangingProcess: false,
		newEmail: ""
	},

	isLoading: {
		changeName: false,
		changeProfileId: false,
		changeEmail: false,
	},
};

export const user = (
	state = initialState,
	action: UserActionTypes
): InitialState => {
	switch (action.type) {
		// SET USER

		case "SET_USER": {
			return {
				...state,
				user: {
					...action.payload.user,
				},
				emailChangingProcess: {
					...action.payload.emailChangingProcess,
				},
			};
		}

		// GET USER

		case "GET_USER_REQUEST": {
			return {
				...state,
				isFetching: true,
			};
		}
		case "GET_USER_SUCCESS": {
			return {
				...state,
				isFetching: false,
			};
		}
		case "GET_USER_FAILURE": {
			return {
				...state,
				isFetching: false,
			};
		}

		// CHANGE NAME

		case "CHANGE_NAME_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeName: true,
				},
			};
		}
		case "CHANGE_NAME_SUCCESS": {
			const { givenName, familyName } = action.payload;
			return {
				...state,
				user: {
					...state.user,
					givenName,
					familyName,
				},
				isLoading: {
					...state.isLoading,
					changeName: false,
				},
			};
		}
		case "CHANGE_NAME_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeName: false,
				},
			};
		}

		// CHANGE PROFILE ID

		case "CHANGE_PROFILE_ID_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeProfileId: true,
				},
			};
		}
		case "CHANGE_PROFILE_ID_SUCCESS": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeProfileId: false,
				},
				user: {
					...state.user,
					profileId: action.profileId,
				},
			};
		}
		case "CHANGE_PROFILE_ID_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeProfileId: false,
				},
			};
		}

		// CHANGE EMAIL REQUEST

		case "CHANGE_EMAIL_REQ_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeEmail: true,
				},
			};
		}
		case "CHANGE_EMAIL_REQ_SUCCESS": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeEmail: false,
				},
				emailChangingProcess: {
					...action.payload,
				},
			};
		}
		case "CHANGE_EMAIL_REQ_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeEmail: false,
				},
			};
		}

		// CHANGE EMAIL

		case "CHANGE_EMAIL_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeEmail: true,
				},
			};
		}
		case "CHANGE_EMAIL_SUCCESS": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeEmail: false,
				},
				user: {
					...state.user,
					email: action.payload.email,
				},
				emailChangingProcess: {
					...action.payload.changingEmailProcess,
				},
			};
		}
		case "CHANGE_EMAIL_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeEmail: false,
				},
			};
		}

		// CHANGE EMAIL ABORT

		case "CHANGE_EMAIL_ABORT_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeEmail: true,
				},
			};
		}
		case "CHANGE_EMAIL_ABORT_SUCCESS": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeEmail: false,
				},
				emailChangingProcess: {
					...action.payload,
				},
			};
		}
		case "CHANGE_EMAIL_ABORT_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeEmail: false,
				},
			};
		}

		default:
			return {
				...state,
			};
	}
};
