export interface User {
	avatar: string;
	bio: string;
	birthday: Date | undefined;
	givenName: string;
	familyName: string;
	email: string;
	profileId: string;
	lastTimeChanged: Date | undefined;
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

export interface ChangePassword {
	oldPassword: string;
	newPassword: string;
	confirmNewPassword: string;
}

export interface ChangeBirthday {
	day: string;
	month: number;
	year: string;
}

export interface IsLoading {
	changeName: boolean;
	changeProfileId: boolean;
	changeEmail: boolean;
	deleteAccount: boolean;
	changePassword: boolean;
	changePhoto: boolean;
	changeBio: boolean;
	changeBirthday: boolean;
}
