// Types
import { AuthActionTypes } from "../actions/types/auth-actions-types/auth-actions-types";

interface InitialState {
	isAuthenticated: boolean;
	status: {
		isError: boolean;
		message: string;
	};

	redirect: boolean;
	isLoading: boolean;
	isLoadingForgotPassword: boolean;
}

const initialState: InitialState = {
	isAuthenticated: false,
	status: {
		isError: false,
		message: "",
	},

	redirect: false,
	isLoading: false,
	isLoadingForgotPassword: false,
};

export const auth = (
	state = initialState,
	action: AuthActionTypes
): InitialState => {
	switch (action.type) {
		// REGISTER

		case "REGISTER_REQUEST": {
			return {
				...state,
				isLoading: true,
			};
		}
		case "REGISTER_SUCCESS": {
			return {
				...state,
				isLoading: false,
			};
		}
		case "REGISTER_FAILURE": {
			return {
				...state,
				isLoading: false,
			};
		}

		// LOGIN

		case "LOGIN_REQUEST": {
			return {
				...state,
				isLoading: true,
			};
		}
		case "LOGIN_SUCCESS": {
			return {
				...state,
				isLoading: false,
				isAuthenticated: true,
			};
		}
		case "LOGIN_FAILURE": {
			return {
				...state,
				isLoading: false,
			};
		}

		// ACTIVATE

		case "ACTIVATE_REQUEST": {
			return {
				...state,
				isLoading: true,
			};
		}
		case "ACTIVATE_SUCCESS": {
			return {
				...state,
				isLoading: false,
				status: {
					...action.payload,
				},
			};
		}
		case "ACTIVATE_FAILURE": {
			return {
				...state,
				isLoading: false,
				status: {
					...action.payload,
				},
			};
		}

		// LOGOUT

		case "LOGOUT_REQUEST": {
			return {
				...state,
				isLoading: true,
			};
		}
		case "LOGOUT_SUCCESS": {
			return {
				...state,
				isLoading: false,
				isAuthenticated: false,
			};
		}
		case "LOGOUT_FAILURE": {
			return {
				...state,
				isLoading: false,
			};
		}

		// FORGOT

		case "FORGOT_REQUEST": {
			return {
				...state,
				isLoadingForgotPassword: true,
			};
		}
		case "FORGOT_SUCCESS": {
			return {
				...state,
				isLoadingForgotPassword: false,
			};
		}
		case "FORGOT_FAILURE": {
			return {
				...state,
				isLoadingForgotPassword: false,
			};
		}

		// RESET

		case "RESET_REQUEST": {
			return {
				...state,
				isLoading: true,
			};
		}
		case "RESET_SUCCESS": {
			return {
				...state,
				isLoading: false,
				redirect: true,
			};
		}
		case "RESET_FAILURE": {
			return {
				...state,
				isLoading: false,
			};
		}

		default:
			return {
				...state,
			};
	}
};
