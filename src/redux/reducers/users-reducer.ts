// Types
import { UsersActionTypes } from "../actions/types/users-actions-types/users-actions-types";
import { User } from "../actions/types/users-actions-types/users-common-types";

interface InitialState {
	user: User;
	isCurrenUser: boolean | undefined;
	isLoading: boolean;
}

const initialState: InitialState = {
	user: {
		avatar: "",
		birthday: undefined,
		givenName: "",
		familyName: "",
		bio: "",
		registrationDate: undefined,
	},

	isCurrenUser: undefined,
	isLoading: false,
};

export const users = (state = initialState, action: UsersActionTypes): InitialState => {
	switch (action.type) {
		case "GET_USER_BY_ID_REQUEST": {
			return {
				...state,
				isLoading: true,
			};
		}
		case "GET_USER_BY_ID_SUCCESS": {
			return {
				...state,
				isLoading: false,
				user: {
					...action.payload.user,
				},
				isCurrenUser: action.payload.isCurrentUser,
			};
		}
		case "GET_USER_BY_ID_FAILURE": {
			return {
				...state,
				isLoading: false,
			};
		}

		default: {
			return {
				...state,
			};
		}
	}
};
