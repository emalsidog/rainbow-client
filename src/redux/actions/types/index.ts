import { AuthActionTypes } from "./auth-actions-types/auth-actions-types";
import { NotificationActionTypes } from "./notifications-actions-types/notifications-actions-types";
import { UserActionTypes } from "./user-actions-types/user-actions-types";
import { UsersActionTypes } from "./users-actions-types/users-actions-types";



export type AppActionTypes =
	| AuthActionTypes
	| NotificationActionTypes
	| UserActionTypes
	| UsersActionTypes;
