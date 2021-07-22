const GET_CHATS_REQUEST = "GET_CHATS_REQUEST";
const GET_CHATS_SUCCESS = "GET_CHATS_SUCCESS";
const GET_CHATS_FAILURE = "GET_CHATS_FAILURE";

const ADD_MESSAGE_REQUEST = "ADD_MESSAGE_REQUEST";
const ADD_MESSAGE_SUCCESS = "ADD_MESSAGE_SUCCESS";
const ADD_MESSAGE_FAILURE = "ADD_MESSAGE_FAILURE";
const ADD_MESSAGE_WS = "ADD_MESSAGE_WS";

const DELETE_MESSAGE = "DELETE_MESSAGE";
const DELETE_MESSAGE_WS = "DELETE_MESSAGE_WS";

const EDIT_MESSAGE = "EDIT_MESSAGE";
const EDIT_MESSAGE_WS = "EDIT_MESSAGE_WS";

const FORWARD_MESSAGE_REQUEST = "FORWARD_MESSAGE_REQUEST";
const FORWARD_MESSAGE_SUCCESS = "FORWARD_MESSAGE_SUCCESS";
const FORWARD_MESSAGE_FAILURE = "FORWARD_MESSAGE_FAILURE";
const FORWARD_MESSAGE_WS = "FORWARD_MESSAGE_WS";

const CREATE_CHAT_REQUEST = "CREATE_CHAT_REQUEST";
const CREATE_CHAT_SUCCESS = "CREATE_CHAT_SUCCESS";
const CREATE_CHAT_FAILURE = "CREATE_CHAT_FAILURE";
const CHAT_CREATED_WS = "CHAT_CREATED_WS";

const CHANGE_CHAT_PROCESS = "CHANGE_CHAT_PROCESS";

export type ChatProcesses = "TYPING" | "IDLE";

export interface Chat {
	participants: Participant[];
	messages: Message[];
	chatId: string;
	creator: Participant;
	status: {
		type: ChatProcesses | null;
		whoInProcess: string | null;
	};
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
	messageId: string;

	isEdited?: boolean;
	timeEdited?: Date;

	repliedToMessage?: Message;
	isForwarded: boolean; 
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

// DELETE MESSAGE
export interface DeleteMessagePayload {
	messagesToDelete: string[];
	chatId: string;
}

export interface DeleteMessage {
	type: typeof DELETE_MESSAGE;
	payload: DeleteMessagePayload;
}

export interface DeleteMessageWS {
	type: typeof DELETE_MESSAGE_WS;
	payload: DeleteMessagePayload;
}

// EDIT MESSAGE
export interface EditMessagePayload {
	meta: {
		messageId: string;
		chatId: string;
	};
	updatedMessageFields: {
		text: string;
		dateEdited: Date;
	};
}

export interface EditMessage {
	type: typeof EDIT_MESSAGE;
	payload: EditMessagePayload;
}

export interface EditMessageWS {
	type: typeof EDIT_MESSAGE_WS;
	payload: EditMessagePayload;
}

// FORWARD MESSAGE
interface SingleForwarded {
	type: "SINGLE_FORWARDED";
	message: Message;
}

interface MultipleForwarded {
	type: "MULTIPLE_FORWARDED";
	messages: Message[];
	meta: {
		chatId: string;
	}
}

export type ForwardMessagePayload = SingleForwarded | MultipleForwarded;

export interface ForwardMessageRequest {
	type: typeof FORWARD_MESSAGE_REQUEST;
	payload: ForwardMessagePayload;
}

export interface ForwardMessageSuccess {
	type: typeof FORWARD_MESSAGE_SUCCESS;
}

export interface ForwardMessageFailure {
	type: typeof FORWARD_MESSAGE_FAILURE;
}

export interface ForwardMessageWS {
	type: typeof FORWARD_MESSAGE_WS;
	payload: ForwardMessagePayload;
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

export interface ChatCreatedWS {
	type: typeof CHAT_CREATED_WS;
	chat: Chat;
}

// Change status of chat to TYPING
export interface ChangeChatProcess {
	type: typeof CHANGE_CHAT_PROCESS;
	payload: {
		chatId: string;
		whoInAction: string;
		processType: ChatProcesses;
	};
}

export type ChatActionTypes =
	| GetChatsRequest
	| GetChatsSuccess
	| GetChatsFailure
	| AddMessageRequest
	| AddMessageSuccess
	| AddMessageFailure
	| AddMessageWS
	| DeleteMessage
	| DeleteMessageWS
	| EditMessage
	| EditMessageWS
	| ForwardMessageRequest
	| ForwardMessageSuccess
	| ForwardMessageFailure
	| ForwardMessageWS
	| CreateChatRequest
	| CreateChatSuccess
	| CreateChatFailure
	| ChatCreatedWS
	| ChangeChatProcess;
