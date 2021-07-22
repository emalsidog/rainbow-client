// Types
import {
	Chat,
	ChatActionTypes,
	DeleteMessagePayload,
	EditMessagePayload,
	ForwardMessagePayload,
	Message,
} from "./types";

// Get chats
export const getChatsRequest = (): ChatActionTypes => ({
	type: "GET_CHATS_REQUEST",
});

export const getChatsSuccess = (chats: Chat[]): ChatActionTypes => ({
	type: "GET_CHATS_SUCCESS",
	chats,
});

export const getChatsFailure = (): ChatActionTypes => ({
	type: "GET_CHATS_FAILURE",
});

// Add message
export const addMessageRequest = (message: Message): ChatActionTypes => ({
	type: "ADD_MESSAGE_REQUEST",
	message,
});

export const addMessageSuccess = (): ChatActionTypes => ({
	type: "ADD_MESSAGE_SUCCESS",
});

export const addMessageFailure = (): ChatActionTypes => ({
	type: "ADD_MESSAGE_FAILURE",
});

// Delete message
export const deleteMessage = (
	payload: DeleteMessagePayload
): ChatActionTypes => ({
	type: "DELETE_MESSAGE",
	payload,
});

// Edit message
export const editMessage = (payload: EditMessagePayload): ChatActionTypes => ({
	type: "EDIT_MESSAGE",
	payload,
});

// Forward Message
export const forwardMessageRequest = (payload: ForwardMessagePayload): ChatActionTypes => ({
	type: "FORWARD_MESSAGE_REQUEST",
	payload,
});

export const forwardMessageSuccess = (): ChatActionTypes => ({
	type: "FORWARD_MESSAGE_SUCCESS",
});

export const forwardMessageFailure = (): ChatActionTypes => ({
	type: "FORWARD_MESSAGE_FAILURE",
});

export const forwardMessageWS = (payload: ForwardMessagePayload): ChatActionTypes => ({
	type: "FORWARD_MESSAGE_WS",
	payload,
});

// Create chat
export const createChatRequest = (participants: string[]): ChatActionTypes => ({
	type: "CREATE_CHAT_REQUEST",
	participants,
});

export const createChatSuccess = (): ChatActionTypes => ({
	type: "CREATE_CHAT_SUCCESS",
});

export const createChatFailure = (): ChatActionTypes => ({
	type: "CREATE_CHAT_FAILURE",
});
