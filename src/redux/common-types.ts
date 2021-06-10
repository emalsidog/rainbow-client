import { AuthActionTypes } from "./auth/types";
import { NotificationActionTypes } from "./notifications/types";
import { UserActionTypes } from "./user/types";
import { UsersActionTypes } from "./users/types";
import { PostActionTypes } from "./posts/types";

export interface PostType {
	postText: string;
	timePosted?: Date;
	isPublic: boolean;
	postId?: string;
}

export type AppActionTypes =
	| AuthActionTypes
	| NotificationActionTypes
	| UserActionTypes
	| UsersActionTypes
	| PostActionTypes;
