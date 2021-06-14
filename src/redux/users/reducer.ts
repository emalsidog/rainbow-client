// Types
import { PostType } from "../common-types";
import { UsersActionTypes } from "./types";
import { User } from "./types";

interface InitialState {
	user: User;
	users: User[];
	isCurrenUser: boolean | undefined;
	isLoading: boolean;
}

const initialState: InitialState = {
	user: {
		_id: "",
		profileId: "",
		avatar: "",
		birthday: undefined,
		givenName: "",
		familyName: "",
		bio: "",
		registrationDate: undefined,
		posts: [],
	},

	users: [],

	isCurrenUser: undefined,
	isLoading: false,
};

export const users = (state = initialState, action: UsersActionTypes): InitialState => {
	switch (action.type) {

		// GET USER

		case "GET_USER_BY_ID_REQUEST": {
			return {
				...state,
				isLoading: true,
			};
		}
		case "GET_USER_BY_ID_SUCCESS": {
			return {
				...state,
				isLoading: false,
				user: {
					...action.payload.user,
				},
				isCurrenUser: action.payload.isCurrentUser,
			};
		}
		case "GET_USER_BY_ID_FAILURE": {
			return {
				...state,
				isLoading: false,
			};
		}

		// SEARCH USER

		case "SEARCH_USER_REQUEST": {
			return {
				...state,
				isLoading: true
			}
		}
		case "SEARCH_USER_SUCCESS": {
			console.log([...action.payload])
			return {
				...state,
				isLoading: false,
				users: [...action.payload]
			}
		}
		case "SEARCH_USER_FAILURE": {
			return {
				...state,
				isLoading: false
			}
		}

		case "NEW_POST_ADDED": {
			return {
				...state,
				user: {
					...state.user,
					posts: [...state.user.posts, action.payload],
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

		default: {
			return {
				...state,
			};
		}
	}
};
