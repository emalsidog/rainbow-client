const GET_CHATS_REQUEST = "GET_CHATS_REQUEST";
const GET_CHATS_SUCCESS = "GET_CHATS_SUCCESS";
const GET_CHATS_FAILURE = "GET_CHATS_FAILURE";

const ADD_MESSAGE_REQUEST = "ADD_MESSAGE_REQUEST";
const ADD_MESSAGE_SUCCESS = "ADD_MESSAGE_SUCCESS";
const ADD_MESSAGE_FAILURE = "ADD_MESSAGE_FAILURE";
const ADD_MESSAGE_WS = "ADD_MESSAGE_WS";

const CREATE_CHAT_REQUEST = "CREATE_CHAT_REQUEST";
const CREATE_CHAT_SUCCESS = "CREATE_CHAT_SUCCESS";
const CREATE_CHAT_FAILURE = "CREATE_CHAT_FAILURE";

export interface Chat {
	participants: Participant[];
	messages: Message[];
	chatId: string;
	creator: Participant;
}

export interface Participant {
	_id: string;
	profileId: string;

	avatar: {
		linkToAvatar: string;
	};
	givenName: string;
	familyName: string;
}

export interface Message {
	text: string;
	time: Date;
	sender: string;
	chatId: string;
}

// GET CHATS

export interface GetChatsRequest {
	type: typeof GET_CHATS_REQUEST;
}

export interface GetChatsSuccess {
	type: typeof GET_CHATS_SUCCESS;
	chats: Chat[];
}

export interface GetChatsFailure {
	type: typeof GET_CHATS_FAILURE;
}

// ADD MESSAGE
export interface AddMessageRequest {
	type: typeof ADD_MESSAGE_REQUEST;
	message: Message;
}

export interface AddMessageSuccess {
	type: typeof ADD_MESSAGE_SUCCESS;
}

export interface AddMessageFailure {
	type: typeof ADD_MESSAGE_FAILURE;
}

export interface AddMessageWS {
	type: typeof ADD_MESSAGE_WS;
	message: Message;
}

// Create chat
export interface CreateChatRequest {
	type: typeof CREATE_CHAT_REQUEST;
	participants: string[];
}

export interface CreateChatSuccess {
	type: typeof CREATE_CHAT_SUCCESS;
}

export interface CreateChatFailure {
	type: typeof CREATE_CHAT_FAILURE;
}

export type ChatActionTypes =
	| GetChatsRequest
	| GetChatsSuccess
	| GetChatsFailure
	| AddMessageRequest
	| AddMessageSuccess
	| AddMessageFailure
	| AddMessageWS
	| CreateChatRequest
	| CreateChatSuccess
	| CreateChatFailure;
