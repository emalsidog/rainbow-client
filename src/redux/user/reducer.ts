// Types
import { User, initialUser } from "../common-types";
import { PostActionTypes } from "../posts";
import { EmailChangingProcess, IsLoading, UserActionTypes } from "./types";

import { FriendsActionTypes } from "../friends/types";
import { Chat, ChatActionTypes, ChatProcesses, Message } from "../chat/types";

interface InitialState {
	user: User;
	populatedFields: {
		populatedFriends: {
			friends: User[];
			hasMoreData: boolean;
			hasMoreSearchedData: boolean;
		};
		populatedFriendRequests: {
			requests: User[];
			hasMoreData: boolean;
		};
	};

	chats: Chat[];

	requestsCounter: number;

	isFetching: boolean;

	emailChangingProcess: EmailChangingProcess;

	isLoading: IsLoading;
}

const initialState: InitialState = {
	user: initialUser,
	populatedFields: {
		populatedFriends: {
			friends: [],
			hasMoreData: true,
			hasMoreSearchedData: true,
		},
		populatedFriendRequests: {
			requests: [],
			hasMoreData: true,
		},
	},
	chats: [],

	requestsCounter: 0,

	isFetching: true,

	emailChangingProcess: {
		timeToNextEmail: undefined,
		isChangingProcess: false,
		newEmail: "",
	},

	isLoading: {
		changeName: false,
		changeProfileId: false,
		changeEmail: false,
		deleteAccount: false,
		changePassword: false,
		changePhoto: false,
		changeBio: false,
		changeBirthday: false,

		loadingUsers: false,

		loadingChats: false,
		creatingNewChat: false,
	},
};

type ActionType =
	| UserActionTypes
	| PostActionTypes
	| FriendsActionTypes
	| ChatActionTypes;

export const user = (
	state = initialState,
	action: ActionType
): InitialState => {
	switch (action.type) {
		// SET USER

		case "SET_USER": {
			return {
				...state,
				user: {
					...action.payload.user,
				},
				emailChangingProcess: {
					...action.payload.emailChangingProcess,
				},
			};
		}

		// GET USER

		case "GET_USER_REQUEST": {
			return {
				...state,
				isFetching: true,
			};
		}
		case "GET_USER_SUCCESS": {
			return {
				...state,
				isFetching: false,
			};
		}
		case "GET_USER_FAILURE": {
			return {
				...state,
				isFetching: false,
			};
		}

		// CHANGE NAME

		case "CHANGE_NAME_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeName: true,
				},
			};
		}
		case "CHANGE_NAME_SUCCESS": {
			const { givenName, familyName } = action.payload;
			return {
				...state,
				user: {
					...state.user,
					givenName,
					familyName,
				},
				isLoading: {
					...state.isLoading,
					changeName: false,
				},
			};
		}
		case "CHANGE_NAME_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeName: false,
				},
			};
		}

		// CHANGE PROFILE ID

		case "CHANGE_PROFILE_ID_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeProfileId: true,
				},
			};
		}
		case "CHANGE_PROFILE_ID_SUCCESS": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeProfileId: false,
				},
				user: {
					...state.user,
					profileId: action.profileId,
				},
			};
		}
		case "CHANGE_PROFILE_ID_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeProfileId: false,
				},
			};
		}

		// CHANGE EMAIL REQUEST

		case "CHANGE_EMAIL_REQ_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeEmail: true,
				},
			};
		}
		case "CHANGE_EMAIL_REQ_SUCCESS": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeEmail: false,
				},
				emailChangingProcess: {
					...action.payload,
				},
			};
		}
		case "CHANGE_EMAIL_REQ_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeEmail: false,
				},
			};
		}

		// CHANGE EMAIL

		case "CHANGE_EMAIL_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeEmail: true,
				},
			};
		}
		case "CHANGE_EMAIL_SUCCESS": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeEmail: false,
				},
				user: {
					...state.user,
					email: action.payload.email,
				},
				emailChangingProcess: {
					...action.payload.changingEmailProcess,
				},
			};
		}
		case "CHANGE_EMAIL_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeEmail: false,
				},
			};
		}

		// CHANGE EMAIL ABORT

		case "CHANGE_EMAIL_ABORT_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeEmail: true,
				},
			};
		}
		case "CHANGE_EMAIL_ABORT_SUCCESS": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeEmail: false,
				},
				emailChangingProcess: {
					...action.payload,
				},
			};
		}
		case "CHANGE_EMAIL_ABORT_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeEmail: false,
				},
			};
		}

		// DELETE ACCOUNT

		case "DELETE_ACCOUNT_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					deleteAccount: true,
				},
			};
		}
		case "DELETE_ACCOUNT_SUCCESS": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					deleteAccount: false,
				},
				user: initialUser,
			};
		}
		case "DELETE_ACCOUNT_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					deleteAccount: false,
				},
			};
		}

		// CHANGE PASSWORD

		case "CHANGE_PASSWORD_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changePassword: true,
				},
			};
		}
		case "CHANGE_PASSWORD_SUCCESS": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changePassword: false,
				},
				user: {
					...state.user,
					lastTimeChanged: action.lastTimeChanged,
				},
			};
		}
		case "CHANGE_PASSWORD_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changePassword: false,
				},
			};
		}

		// CHANGE PHOTO

		case "CHANGE_AVATAR_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changePhoto: true,
				},
			};
		}
		case "CHANGE_AVATAR_SUCCESS": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changePhoto: false,
				},
				user: {
					...state.user,
					avatar: action.avatar,
				},
			};
		}
		case "CHANGE_AVATAR_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changePhoto: false,
				},
			};
		}

		// CHANGE BIO

		case "CHANGE_BIO_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeBio: true,
				},
			};
		}
		case "CHANGE_BIO_SUCCESS": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeBio: false,
				},
				user: {
					...state.user,
					bio: action.bio,
				},
			};
		}
		case "CHANGE_BIO_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeBio: false,
				},
			};
		}

		// CHANGE BIRTHDAY

		case "CHANGE_BIRTHDAY_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeBirthday: true,
				},
			};
		}
		case "CHANGE_BIRTHDAY_SUCCESS": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeBirthday: false,
				},
				user: {
					...state.user,
					birthday: action.birthday,
				},
			};
		}
		case "CHANGE_BIRTHDAY_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					changeBirthday: false,
				},
			};
		}

		// DECLINE FRIEND REQUEST

		case "DECLINE_FRIEND_REQ_REQUEST": {
			return {
				...state,
			};
		}
		case "DECLINE_FRIEND_REQ_SUCCESS": {
			const { declinedRequestId } = action;
			const newRequests = state.user.friendRequests.filter(
				(requestId) => requestId !== declinedRequestId
			);

			const newPopualtedRequests =
				state.populatedFields.populatedFriendRequests.requests.filter(
					(request) => request._id !== declinedRequestId
				);

			return {
				...state,
				user: {
					...state.user,
					friendRequests: newRequests,
				},
				populatedFields: {
					...state.populatedFields,
					populatedFriendRequests: {
						...state.populatedFields.populatedFriendRequests,
						requests: newPopualtedRequests,
					},
				},
			};
		}
		case "DECLINE_FRIEND_REQ_FAILURE": {
			return {
				...state,
			};
		}

		// GET POPULATED FRIENDS

		case "GET_POPULATED_FRIENDS_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					loadingUsers: true,
				},
			};
		}

		case "GET_POPULATED_FRIENDS_SUCCESS": {
			const { friends, meta } = action.payload;

			let newFriends;
			if (meta.usersNeedToBeCleared) {
				newFriends = [...friends];
			} else {
				newFriends = [
					...state.populatedFields.populatedFriends.friends,
					...friends,
				];
			}

			return {
				...state,
				isLoading: {
					...state.isLoading,
					loadingUsers: false,
				},
				populatedFields: {
					...state.populatedFields,
					populatedFriends: {
						...state.populatedFields.populatedFriends,
						friends: newFriends,
						hasMoreData: meta.hasMoreData,
						hasMoreSearchedData: meta.hasMoreSearchedData,
					},
				},
			};
		}

		case "GET_POPULATED_FRIENDS_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					loadingUsers: false,
				},
			};
		}

		// GET POPULATED FRIEND REQUESTS

		case "GET_POPULATED_FRIEND_REQUESTS_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					loadingUsers: true,
				},
			};
		}

		case "GET_POPULATED_FRIEND_REQUESTS_SUCCESS": {
			const { friendRequests, hasMoreData } = action.payload;
			return {
				...state,
				isLoading: {
					...state.isLoading,
					loadingUsers: false,
				},
				populatedFields: {
					...state.populatedFields,
					populatedFriendRequests: {
						...state.populatedFields.populatedFriendRequests,
						requests: [
							...state.populatedFields.populatedFriendRequests
								.requests,
							...friendRequests,
						],
						hasMoreData,
					},
				},
			};
		}

		case "GET_POPULATED_FRIEND_REQUESTS_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					loadingUsers: false,
				},
			};
		}

		// REMOVE FROM FRIENDS

		case "REMOVE_FROM_FRIENDS_REQUEST": {
			return {
				...state,
			};
		}

		case "REMOVE_FROM_FRIENDS_SUCCESS": {
			const { idOfUserToRemove } = action;
			const newFriends = state.user.friends.filter(
				(friendId) => friendId !== idOfUserToRemove
			);

			const newPopualtedFriends =
				state.populatedFields.populatedFriends.friends.filter(
					(friend) => friend._id !== idOfUserToRemove
				);

			return {
				...state,
				user: {
					...state.user,
					friends: newFriends,
				},
				populatedFields: {
					...state.populatedFields,
					populatedFriends: {
						...state.populatedFields.populatedFriends,
						friends: newPopualtedFriends,
					},
				},
			};
		}

		case "REMOVE_FROM_FRIENDS_FAILURE": {
			return {
				...state,
			};
		}

		// GET CHATS

		case "GET_CHATS_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					loadingUsers: true,
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
					loadingUsers: false,
				},
				chats,
			};
		}
		case "GET_CHATS_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					loadingUsers: false,
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

		/* 
			"NEW_FRIEND_REQUEST" - responsible for updating client,
			which have got a notification (add currentUserId to friendRequests)
		*/
		case "NEW_FRIEND_REQUEST": {
			return {
				...state,
				user: {
					...state.user,
					friendRequests: [
						...state.user.friendRequests,
						action.payload.currentUserId,
					],
				},
			};
		}

		/*
			UPDATE_FRIENDS_WHEN_ACCEPTED_REQUEST - update current user of client which was accepted
			(update user.user of client which was accepted) with new friends (add idOfUserWhoAccepted) and
			new requests (remove idOfUserWhoAccepted)
		*/
		case "UPDATE_FRIENDS_WHEN_ACCEPTED_REQUEST": {
			const { newFriendId } = action;
			const newRequests = state.user.friendRequests.filter(
				(requestId) => requestId.toString() !== newFriendId.toString()
			);

			const newPopualtedRequests =
				state.populatedFields.populatedFriendRequests.requests.filter(
					(request) => request._id !== newFriendId
				);

			return {
				...state,
				user: {
					...state.user,
					friendRequests: newRequests,
					friends: [...state.user.friends, newFriendId],
				},
				populatedFields: {
					...state.populatedFields,
					populatedFriendRequests: {
						...state.populatedFields.populatedFriendRequests,
						requests: newPopualtedRequests,
					},
				},
			};
		}
		/*
			FRIEND_REQUEST_CANCELLED - after some client has cancelled its request - update client (user.user)
			who	had this request by removing idOfUserWhoCancelled from the friendRequests
		*/
		case "FRIEND_REQUEST_CANCELLED": {
			const { idOfUserWhoCancelled } = action;
			const newRequests = state.user.friendRequests.filter(
				(requestId) => requestId !== idOfUserWhoCancelled
			);
			return {
				...state,
				user: {
					...state.user,
					friendRequests: newRequests,
				},
			};
		}
		/*
			UPDATE_REQUEST_COUNTER - update requests counter
		*/
		case "UPDATE_REQUEST_COUNTER": {
			const { count } = action;
			return {
				...state,
				requestsCounter: count,
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
