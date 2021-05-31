export interface User {
	givenName: string;
	familyName: string;
	email: string;
	profileId: string;
}

export interface EmailChangingProcess {
	timeToNextEmail: number | undefined;
	isChangingProcess: boolean;
	newEmail: string;
}

export interface UserExtended {
	user: User;
	emailChangingProcess: EmailChangingProcess;
}

export interface ChangeName {
	givenName: string;
	familyName: string;
}

export interface ChangeEmail {
	email: string;
	changingEmailProcess: EmailChangingProcess;
}

export interface IsLoading {
	changeName: boolean;
	changeProfileId: boolean;
	changeEmail: boolean;
	deleteAccount: boolean;
}
