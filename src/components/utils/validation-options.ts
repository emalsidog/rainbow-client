export const givenNameOptions = {
	required: {
		value: true,
		message: "This field is required",
	},
	minLength: {
		value: 2,
		message: "Minimal length is 2",
	},
	maxLength: {
		value: 15,
		message: "Maximal length is 15",
	},
	pattern: {
		value: /^[A-zА-я]+$/,
		message: "Given name must be alphabetic",
	},
};

export const familyNameOptions = {
	required: {
		value: true,
		message: "This field is required",
	},
	minLength: {
		value: 2,
		message: "Minimal length is 2",
	},
	maxLength: {
		value: 15,
		message: "Maximal length is 15",
	},
	pattern: {
		value: /^[A-zА-я]+$/,
		message: "Family name must be alphabetic",
	},
};

export const emailOptions = {
	required: {
		value: true,
		message: "This field is required",
	},
	pattern: {
		value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		message: "Email is invalid",
	},
};

export const passwordOptions = {
	required: {
		value: true,
		message: "This field is required",
	},
	minLength: {
		value: 6,
		message: "Minimal length is 6",
	},
	maxLength: {
		value: 15,
		message: "Maximal length is 15",
	},
	pattern: {
		value: /^[A-Za-z0-9\-_]*$/,
		message:
			"Password should contain only letters, numbers special characters (_, -)",
	},
};

export const profileIdOptions = {
	required: {
		value: true,
		message: "It can not be empty",
	},
	minLength: {
		value: 5,
		message: "Minimal length is 5",
	},
	maxLength: {
		value: 15,
		message: "Maximal length is 15",
	},
	pattern: {
		value: /^[a-z0-9]+$/,
		message: "Profile id name must contain letters, numbers or symbols",
	},
};

export const RegisterFields = [
	givenNameOptions,
	familyNameOptions,
	emailOptions,
	passwordOptions,
];
