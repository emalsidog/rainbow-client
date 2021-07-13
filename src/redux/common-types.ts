import { AuthActionTypes } from "./auth/types";
import { NotificationActionTypes } from "./notifications/types";
import { UserActionTypes } from "./user/types";
import { UsersActionTypes } from "./users/types";
import { PostActionTypes } from "./posts/types";
import { FriendsActionTypes } from "./friends/types";

export type AppActionTypes =
	| AuthActionTypes
	| NotificationActionTypes
	| UserActionTypes
	| UsersActionTypes
	| PostActionTypes
	| FriendsActionTypes;

// User related
export const initialUser = {
	_id: "",
	profileId: "",

	avatar: "",
	givenName: "",
	familyName: "",
	bio: "",
	email: "",
	accountType: "MEMBER" as AccountType,

	isOnline: false,
	lastSeenOnline: undefined,

	friends: [],
	friendRequests: [],

	registrationDate: undefined,
	birthday: undefined,
	lastTimeChanged: undefined,
};

export interface User {
	_id: string;
	email?: string;

	profileId: string;
	avatar: string;
	givenName: string;
	familyName: string;
	bio: string;
	accountType: "DEVELOPER" | "MEMBER" | "VERIFIED";

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
export type FriendshipStatus =
	| "FRIENDS"
	| "PENDING_FOR_USER_RESPONSE"
	| "PENDING_FOR_YOUR_RESPONSE"
	| "NONE";

//  ACCOUNT TYPE
export type AccountType = "MEMBER" | "DEVELOPER" | "VERIFIED";
