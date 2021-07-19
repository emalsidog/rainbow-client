// Types
import { User, initialUser } from "../common-types";
import { PostActionTypes } from "../posts";
import { EmailChangingProcess, IsLoading, UserActionTypes } from "./types";

import { FriendsActionTypes } from "../friends/types";

interface InitialState {
	user: User;
	displayedUser: User;

	searchedUsers: User[];
	onlineUsers: string[];

	hasMoreData: boolean;
	hasMoreSearchedData: boolean;

	isCurrentUser: boolean | undefined;

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

	requestsCounter: number;

	isFetching: boolean;

	emailChangingProcess: EmailChangingProcess;

	isLoading: IsLoading;
}

const initialState: InitialState = {
	user: initialUser,
	displayedUser: initialUser,

	searchedUsers: [],
	onlineUsers: [],

	hasMoreData: true,
	hasMoreSearchedData: true,
	
	isCurrentUser: undefined,

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

		isFetchingUser: true,
		isFetchingUsers: false,
		loading: false,

		loadingPosts: false,
	},
};

type ActionType = UserActionTypes | PostActionTypes | FriendsActionTypes;

export const user = (state = initialState, action: ActionType): InitialState => {
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

		// SEND FRIEND REQUEST

		case "SEND_FRIEND_REQ_REQUEST": {
			return {
				...state
			}
		}

		case "SEND_FRIEND_REQ_SUCCESS": {
			const { idOfUserToUpdate, newRequestId } = action.payload;

			const newSearchedUsers = state.searchedUsers.map(user => {
				if (user._id === idOfUserToUpdate) {
					return {
						...user,
						friendRequests: [...user.friendRequests, newRequestId]
					}
				}
				return user;
			})

			return {
				...state,
				displayedUser: {
					...state.displayedUser,
					friendRequests: [...state.displayedUser.friendRequests, newRequestId]
				},
				searchedUsers: newSearchedUsers
			}
		}

		case "SEND_FRIEND_REQ_FAILURE": {
			return {
				...state
			}
		}

		case "SEND_FRIEND_REQ_WS": {
			const { newRequestId, requestsCount } = action.payload;
			return {
				...state,
				user: {
					...state.user,
					friendRequests: [...state.user.friendRequests, newRequestId],
				},
				requestsCounter: requestsCount
			}
		}

		// ACCEPT FRIEND REQUEST

		case "ACCEPT_FRIEND_REQ_REQUEST": {
			return {
				...state,
			};
		}

		case "ACCEPT_FRIEND_REQ_SUCCESS": {
			const { newFriendId, requestsCount } = action.payload;

			const newRequests = filterFriendRequests(state.user.friendRequests, newFriendId)

			return {
				...state,
				user: {
					...state.user,
					friendRequests: newRequests,
					friends: [...state.user.friends, newFriendId],
				},
				requestsCounter: requestsCount,
			};
		}

		case "ACCEPT_FRIEND_REQ_FAILURE": {
			return {
				...state,
			};
		}

		case "ACCEPT_FRIEND_REQ_WS": {
			const { acceptedUserId, idOfUserWhoAccepted } = action.payload;

			const newSearchedUsers = state.searchedUsers.map(user => {
				if (user._id === idOfUserWhoAccepted) {
					const newRequests = filterFriendRequests(user.friendRequests, acceptedUserId);

					return {
						...user,
						friendRequests: newRequests,
						friends: [...user.friends, acceptedUserId]	
					}
				}
				return user;
			})

			return {
				...state,
				user: {
					...state.user,
					friends: [...state.user.friends, idOfUserWhoAccepted],
				},
				displayedUser: {
					...state.displayedUser,
					friendRequests: filterFriendRequests(state.displayedUser.friendRequests, acceptedUserId),
					friends: [...state.displayedUser.friends, acceptedUserId]
				},
				searchedUsers: newSearchedUsers
			};
		}

		// CANCEL FRIEND REQUEST

		case "CANCEL_FRIEND_REQ_REQUEST": {
			return {
				...state
			}
		}

		case "CANCEL_FRIEND_REQ_SUCCESS": {
			const { cancelledRequestId, userToUpdate } = action.payload;

			const newSearchedUsers = state.searchedUsers.map(user => {
				if (user._id === userToUpdate) {
					return {
						...user,
						friendRequests: filterFriendRequests(user.friendRequests, cancelledRequestId)
					}
				}
				return user;
			});

			return {
				...state,
				displayedUser: {
					...state.displayedUser,
					friendRequests: filterFriendRequests(state.displayedUser.friendRequests, cancelledRequestId)
				},
				searchedUsers: newSearchedUsers
			}
		}

		case "CANCEL_FRIEND_REQ_FAILURE": {
			return {
				...state
			}
		}

		case "CANCEL_FRIEND_REQ_WS": {
			const { cancelledRequestId, requestsCount } = action.payload;
			return {
				...state,
				user: {
					...state.user,
					friendRequests: filterFriendRequests(state.user.friendRequests, cancelledRequestId)
				},
				requestsCounter: requestsCount
			}
		}

		// DECLINE FRIEND REQUEST

		case "DECLINE_FRIEND_REQ_REQUEST": {
			return {
				...state
			}
		}

		case "DECLINE_FRIEND_REQ_SUCCESS": {
			const { declinedRequestId, requestsCount } = action.payload;
			return {
				...state,
				user: {
					...state.user,
					friendRequests: filterFriendRequests(state.user.friendRequests, declinedRequestId)
				},
				requestsCounter: requestsCount
			}
		}

		case "DECLINE_FRIEND_REQ_FAILURE": {
			return {
				...state
			}
		}

		case "DECLINE_FRIEND_REQ_WS": {
			const { declinedRequestId, userToUpdate } = action.payload;

			const newSearchedUsers = state.searchedUsers.map(user => {
				if (user._id === userToUpdate) {
					return {
						...user,
						friendRequests: filterFriendRequests(user.friendRequests, declinedRequestId)
					}
				}
				return user;
			})

			return {
				...state,
				displayedUser: {
					...state.displayedUser,
					friendRequests: filterFriendRequests(state.displayedUser.friendRequests, declinedRequestId)
				},
				searchedUsers: newSearchedUsers
			}
		}

		// REMOVE FROM FRIENDS

		case "REMOVE_FROM_FRIENDS_REQUEST": {
			return {
				...state
			}
		}

		case "REMOVE_FROM_FRIENDS_SUCCESS": {
			const { removedFriendId } = action;

			return {
				...state,
				user: {
					...state.user,
					friends: state.user.friends.filter(friend => friend !== removedFriendId)
				}
			}
		}

		case "REMOVE_FROM_FRIENDS_FAILURE": {
			return {
				...state
			}
		}

		case "REMOVE_FROM_FRIENDS_WS": {
			const { removedFriendId } = action;

			return {
				...state,
				user: {
					...state.user,
					friends: state.user.friends.filter(friend => friend !== removedFriendId)
				},
			}
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

		// GET DISPLAYED USER

		case "GET_DISPLAYED_USER_BY_ID_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					isFetchingUser: true,
				},
			};
		}

		case "GET_DISPLAYED_USER_BY_ID_SUCCESS": {
			const { isCurrentUser, user } = action.payload;
			return {
				...state,
				isLoading: {
					...state.isLoading,
					isFetchingUser: false,
				},
				displayedUser: {
					...user,
				},
				isCurrentUser,
			};
		}

		case "GET_DISPLAYED_USER_BY_ID_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					isFetchingUser: false,
				},
			};
		}

		case "SET_IS_FETCHING_DISPLAYED_USER": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					isFetchingUser: action.isFetching,
				},
			};
		}

		// SEARCH USERS

		case "SEARCH_USERS_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					isFetchingUsers: true,
				},
			};
		}

		case "SEARCH_USERS_SUCCESS": {
			const { meta, users } = action.payload;

			let newUsers;
			if (meta.usersNeedToBeCleared) {
				newUsers = [...users];
			} else {
				newUsers = [...state.searchedUsers, ...users];
			}

			return {
				...state,
				isLoading: {
					...state.isLoading,
					isFetchingUsers: false,
				},
				searchedUsers: newUsers,
				hasMoreData: meta.hasMoreData,
				hasMoreSearchedData: meta.hasMoreSearchedData,
			};
		}

		case "SEARCH_USERS_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					isFetchingUsers: false,
				},
			};
		}

		// UPDATE ONLINE STATUS
		
		case "UPDATE_ONLINE_STATUS": {
			const { isOnline, id } = action.payload;

			let newOnlineUsers: string[] = [];

			const alreadyInList = state.onlineUsers.includes(id);

			if (isOnline && alreadyInList) {
				newOnlineUsers = [...state.onlineUsers];
			} else if (isOnline) {
				newOnlineUsers = [...state.onlineUsers, id];
			} else {
				newOnlineUsers = state.onlineUsers.filter(
					(userId) => userId !== id
				);
			}

			return {
				...state,
				onlineUsers: newOnlineUsers,
			};
		}

		// GET ONLINE CLIENTS IDS

		case "GET_ONLINE_CLIENTS": {
			return {
				...state,
				onlineUsers: action.clients,
			};
		}

		default: {
			return {
				...state,
			};
		}
	}
};


const filterFriendRequests = (requests: string[], idToRemove: string): string[] => {
	return requests.filter(request => request !== idToRemove);
}
