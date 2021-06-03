export interface User {
	avatar: string;
	birthday: Date | undefined;
	givenName: string;
	familyName: string;
	bio: string;
	registrationDate: Date | undefined;
}

export interface GetUserPayload {
	user: User;
	isCurrentUser: boolean;
}
