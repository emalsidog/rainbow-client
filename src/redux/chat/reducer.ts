import { Chat, ChatActionTypes, ChatProcesses, Message } from "./types";

interface InitialState {
	chats: Chat[];

	isLoading: {
		loadingChats: boolean;
		creatingNewChat: boolean;
	};
}

const initialState: InitialState = {
	chats: [],

	isLoading: {
		loadingChats: false,
		creatingNewChat: false,
	},
};

export const chats = (
	state = initialState,
	action: ChatActionTypes
): InitialState => {
	switch (action.type) {
		// GET CHATS

		case "GET_CHATS_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					loadingChats: true,
				},
			};
		}
		case "GET_CHATS_SUCCESS": {
			const chats = action.chats.map((chat) => ({
				...chat,
				status: {
					type: "IDLE" as ChatProcesses,
					whoInProcess: null,
				},
			}));

			return {
				...state,
				isLoading: {
					...state.isLoading,
					loadingChats: false,
				},
				chats,
			};
		}
		case "GET_CHATS_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					loadingChats: false,
				},
			};
		}

		// ADD MESSAGE
		case "ADD_MESSAGE_REQUEST": {
			const { message } = action;
			const newChats = addMessage(state.chats, message);

			return {
				...state,
				chats: newChats,
			};
		}
		case "ADD_MESSAGE_SUCCESS": {
			return {
				...state,
			};
		}
		case "ADD_MESSAGE_FAILURE": {
			return {
				...state,
			};
		}
		case "ADD_MESSAGE_WS": {
			const { message } = action;
			const newChats = addMessage(state.chats, message);

			return {
				...state,
				chats: newChats,
			};
		}

		// Create new chat
		case "CREATE_CHAT_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					creatingNewChat: true,
				},
			};
		}
		case "CREATE_CHAT_SUCCESS": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					creatingNewChat: false,
				},
			};
		}
		case "CREATE_CHAT_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					creatingNewChat: false,
				},
			};
		}
		case "CHAT_CREATED_WS": {
			return {
				...state,
				chats: [...state.chats, action.chat],
			};
		}

		case "CHANGE_CHAT_PROCESS": {
			const { chatId, processType, whoInAction } = action.payload;

			const newChats = state.chats.map((chat) => {
				if (chat.chatId === chatId) {
					return {
						...chat,
						status: {
							type: processType,
							whoInProcess: whoInAction,
						},
					};
				}
				return chat;
			});

			return {
				...state,
				chats: newChats,
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
};

// Add new message to chat
const addMessage = (chats: Chat[], message: Message): Chat[] => {
	return chats.map((chat) => {
		if (chat.chatId === message.chatId) {
			return {
				...chat,
				messages: [...chat.messages, message],
			};
		}
		return chat;
	});
};
