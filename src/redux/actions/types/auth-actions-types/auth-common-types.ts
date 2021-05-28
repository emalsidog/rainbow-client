export interface RegisterData {
	givenName: string;
	familyName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface Status {
	isError: boolean;
	message: string;
}

export interface ResetData {
	resetToken: any;
	password: string;
	confirmPassword: string;
}
