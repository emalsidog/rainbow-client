// Types
import { Chat, ChatActionTypes, Message } from "./types";

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
