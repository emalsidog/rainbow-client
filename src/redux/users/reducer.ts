// Types
import { PostType, initialUser, User } from "../common-types";
import { FriendsActionTypes } from "../friends/types";
import { UsersActionTypes } from "./types";

interface InitialState {
	user: User;
	users: User[];

	hasMoreData: boolean;
	hasMoreSearchedData: boolean;

	isCurrenUser: boolean | undefined;

	isLoading: isLoading;
}

const initialState: InitialState = {
	user: initialUser,
	users: [],

	hasMoreData: true,
	hasMoreSearchedData: true,

	isCurrenUser: undefined,

	isLoading: {
		isFetchingUser: true,
		isFetchingUsers: false,
		loading: false,
	},
};

type ActionType = UsersActionTypes | FriendsActionTypes;

export interface isLoading {
	isFetchingUser: boolean,
	isFetchingUsers: boolean,
	loading: boolean,
}

export const users = (state = initialState,	action: ActionType): InitialState => {
	switch (action.type) {
		// GET USER

		case "GET_USER_BY_ID_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					isFetchingUser: true
				}
			};
		}
		case "GET_USER_BY_ID_SUCCESS": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					isFetchingUser: false
				},
				user: {
					...action.payload.user,
				},
				isCurrenUser: action.payload.isCurrentUser,
			};
		}
		case "GET_USER_BY_ID_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					isFetchingUser: false
				}
			};
		}
		case "SET_IS_FETCHING_USER": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					isFetchingUser: action.isFetching
				}
			};
		}

		// SEARCH USERS

		case "SEARCH_USERS_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					isFetchingUsers: true
				}
			};
		}
		case "SEARCH_USERS_SUCCESS": {
			const { meta, users } = action.payload;

			let newUsers;
			if (meta.usersNeedToBeCleared) {
				newUsers = [...users];
			} else {
				newUsers = [...state.users, ...users];
			}

			return {
				...state,
				isLoading: {
					...state.isLoading,
					isFetchingUsers: false
				},
				users: newUsers,
				hasMoreData: meta.hasMoreData,
				hasMoreSearchedData: meta.hasMoreSearchedData,
			};
		}
		case "SEARCH_USERS_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					isFetchingUsers: false
				}
			};
		}

		// SEND FRIEND REQUEST

		case "SEND_FRIEND_REQ_REQUEST": {
			return {
				...state,
			};
		}
		case "SEND_FRIEND_REQ_SUCCESS": {
			const { idOfUserToUpdate, newRequestId } = action.payload;

			let newUser = { ...state.user };
			if (state.user._id === idOfUserToUpdate) {
				newUser.friendRequests = [
					...state.user.friendRequests,
					newRequestId,
				];
			}

			const newUsers = state.users.map((user) => {
				if (user._id === idOfUserToUpdate) {
					return {
						...user,
						friendRequests: [...user.friendRequests, newRequestId],
					};
				}
				return user;
			});

			return {
				...state,
				users: newUsers,
				user: newUser,
			};
		}
		case "SEND_FRIEND_REQ_FAILURE": {
			return {
				...state,
			};
		}

		// ACCEPT FRIEND REQUEST

		case "ACCEPT_FRIEND_REQ_REQUEST": {
			return {
				...state,
			};
		}
		case "ACCEPT_FRIEND_REQ_SUCCESS": {
			return {
				...state,
			};
		}
		case "ACCEPT_FRIEND_REQ_FAILURE": {
			return {
				...state,
			};
		}

		// CANCEL FRIEND REQUEST

		case "CANCEL_FRIEND_REQ_REQUEST": {
			return {
				...state,
			};
		}

		case "CANCEL_FRIEND_REQ_SUCCESS": {
			const { idOfUserWhoCancelled, userWhoHasRequest } = action.payload;

			let newUser = { ...state.user };
			if (state.user._id === userWhoHasRequest) {
				const newRequests = newUser.friendRequests.filter(
					(requestId) => requestId !== idOfUserWhoCancelled
				);
				newUser.friendRequests = newRequests;
			}

			const newUsers = state.users.map((user) => {
				if (user._id === userWhoHasRequest) {
					const newRequests = user.friendRequests.filter(
						(requestId) => requestId !== idOfUserWhoCancelled
					);
					return {
						...user,
						friendRequests: newRequests,
					};
				}
				return user;
			});
			return {
				...state,
				users: newUsers,
				user: newUser,
			};
		}

		case "CANCEL_FRIEND_REQ_FAILURE": {
			return {
				...state,
			};
		}

		// WEB SOCKET ACTIONS

		case "NEW_POST_ADDED": {
			return {
				...state,
				user: {
					...state.user,
					posts: [action.payload, ...state.user.posts],
				},
			};
		}
		case "DELETE_POST": {
			const newPosts = state.user.posts.filter(
				(post: PostType) => post.postId !== action.postId
			);
			return {
				...state,
				user: {
					...state.user,
					posts: newPosts,
				},
			};
		}
		case "POST_UPDATED": {
			const { postText, isPublic, postId } = action.payload;

			const newPosts = state.user.posts.map((post) => {
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
				user: {
					...state.user,
					posts: newPosts,
				},
			};
		}

		/*
			UPDATE_USER_WHO_ACCEPTED - update client, which has been accepted by current user
			(find current user (who accepted) in users array and update it (add acceptedUserId to friends and
			remove it from requests)).
		*/
		case "UPDATE_USER_WHO_ACCEPTED": {
			const { acceptedUserId, idOfUserWhoAccepted } = action.payload;

			let newUser = { ...state.user };
			if (state.user._id === idOfUserWhoAccepted) {
				const newRequests = newUser.friendRequests.filter(
					(requestId) => requestId !== acceptedUserId
				);
				newUser.friendRequests = newRequests;
			}

			const newUsers = state.users.map((user) => {
				if (user._id === idOfUserWhoAccepted) {
					const newRequests = user.friendRequests.filter(
						(requestId) => requestId !== acceptedUserId
					);

					return {
						...user,
						friendRequests: newRequests,
						friends: [...user.friends, acceptedUserId],
					};
				}
				return user;
			});

			return {
				...state,
				users: newUsers,
				user: newUser,
			};
		}
		/*
			FRIEND_REQUEST_DECLINED - after some client have declined request, update array of users
			in client, whis has been rejected. 
		*/
		case "FRIEND_REQUEST_DECLINED": {
			const { declinedRequestId, idOfUserWhoDeclined } = action.payload;

			let newUser = { ...state.user };
			if (state.user._id === idOfUserWhoDeclined) {
				const newRequests = newUser.friendRequests.filter(
					(requestId) => requestId !== declinedRequestId
				);
				newUser.friendRequests = newRequests;
			}

			const newUsers = state.users.map((user) => {
				if (user._id === idOfUserWhoDeclined) {
					const newRequests = user.friendRequests.filter(
						(requestId) => requestId !== declinedRequestId
					);
					return {
						...user,
						friendRequests: newRequests,
					};
				}
				return user;
			});

			return {
				...state,
				users: newUsers,
				user: newUser,
			};
		}
		/* 
			REMOVE_FROM_FRIENDS - Clear friends array in users.users 
		*/
		case "REMOVE_FROM_FRIENDS": {
			const { idOfUserToRemove, idOfUserWhoHasFriend } = action.payload;

			const newUsers = state.users.map((user) => {
				if (user._id === idOfUserToRemove) {
					const newFriends = user.friends.filter(
						(friendId) => friendId !== idOfUserWhoHasFriend
					);
					return {
						...user,
						friends: newFriends,
					};
				}
				return user;
			});

			return {
				...state,
				users: newUsers,
			};
		}

		default: {
			return {
				...state,
			};
		}
	}
};
