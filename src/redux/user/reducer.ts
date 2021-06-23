// Types
import { PostType, User } from "../common-types";
import { PostActionTypes } from "../posts";
import { EmailChangingProcess, IsLoading, UserActionTypes } from "./types";

import { initialUser } from "../common-types";

interface InitialState {
	user: User;
	isFetching: boolean;

	emailChangingProcess: EmailChangingProcess;

	isLoading: IsLoading;
}

const initialState: InitialState = {
	user: initialUser,
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

		addPost: false,
		deletePost: false,
		editPost: false,
	},
};

export const user = (
	state = initialState,
	action: UserActionTypes | PostActionTypes
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

		// ADD POST

		case "ADD_POST_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					addPost: true,
				},
			};
		}
		case "ADD_POST_SUCCESS": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					addPost: false,
				},
				user: {
					...state.user,
					posts: [...state.user!.posts, action.payload],
				},
			};
		}
		case "ADD_POST_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					addPost: false,
				},
			};
		}

		// DELETE POST

		case "DELETE_POST_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					deletePost: true,
				},
			};
		}
		case "DELETE_POST_SUCCESS": {
			const newPosts = state.user!.posts.filter(
				(post: PostType) => post.postId !== action.postId
			);

			return {
				...state,
				isLoading: {
					...state.isLoading,
					deletePost: false,
				},
				user: {
					...state.user,
					posts: newPosts,
				},
			};
		}
		case "DELETE_POST_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					deletePost: false,
				},
			};
		}

		// EDIT POST

		case "EDIT_POST_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					editPost: true,
				},
			};
		}
		case "EDIT_POST_SUCCESS": {
			const { postText, isPublic, postId } = action.payload;
			const newPosts = state.user!.posts.map((post) => {
				if (post.postId === postId) {
					return {
						...post,
						postText,
						isPublic,
					};
				}
				return post;
			});
			return {
				...state,
				isLoading: {
					...state.isLoading,
					editPost: false,
				},
				user: {
					...state.user,
					posts: newPosts,
				},
			};
		}
		case "EDIT_POST_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					editPost: false,
				},
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
			return {
				...state,
				user: {
					...state.user,
					friendRequests: newRequests,
					friends: [...state.user.friends, newFriendId],
				},
			};
		}

		default: {
			return {
				...state,
			};
		}
	}
};
