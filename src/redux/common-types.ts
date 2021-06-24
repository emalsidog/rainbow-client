import { AuthActionTypes } from "./auth/types";
import { NotificationActionTypes } from "./notifications/types";
import { UserActionTypes } from "./user/types";
import { UsersActionTypes } from "./users/types";
import { PostActionTypes } from "./posts/types";

export type AppActionTypes =
	| AuthActionTypes
	| NotificationActionTypes
	| UserActionTypes
	| UsersActionTypes
	| PostActionTypes;

// User related
export const initialUser = {
	_id: "",
	profileId: "",

	avatar: "",
	givenName: "",
	familyName: "",
	bio: "",
	email: "",

	posts: [],
	friends: [],
	friendRequests: [],

	registrationDate: undefined,
	birthday: undefined,
	lastTimeChanged: undefined,
}

export interface User {
	_id: string;
	email?: string;

	profileId: string;
	avatar: string;
	givenName: string;
	familyName: string;
	bio: string;

	posts: PostType[];
	friends: string[];
	friendRequests: string[];

	birthday: Date | undefined;
	lastTimeChanged?: Date | undefined;
	registrationDate: Date | undefined;
}

// Post related
export interface PostType {
	postText: string;
	timePosted?: Date;
	isPublic: boolean;
	postId?: string;
}

// Friendship status
export type FriendshipStatus = "FRIENDS" | "PENDING_FOR_USER_RESPONSE" | "PENDING_FOR_YOUR_RESPONSE" | "NONE";