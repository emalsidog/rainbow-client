import { PostType } from "../user-actions-types/user-common-types";

export interface User {
	avatar: string;
	birthday: Date | undefined;
	givenName: string;
	familyName: string;
	bio: string;
	registrationDate: Date | undefined;
	posts: PostType[];
}

export interface GetUserPayload {
	user: User;
	isCurrentUser: boolean;
}
