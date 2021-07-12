// Types
import { PostType } from "../common-types";
import { isLoading, PostActionTypes } from "./types";

interface InitialState {
	posts: PostType[];
	hasMorePosts: boolean;

	displayedUserPosts: PostType[];
	hasMoreDisplayedUserPosts: boolean;

	isLoading: isLoading;
}

const initialState: InitialState = {
	posts: [],
	hasMorePosts: true,

	displayedUserPosts: [],
	hasMoreDisplayedUserPosts: true,

	isLoading: {
		addPost: false,
		editPost: false,
		deletePost: false,
		loadingPosts: false,
	},
};

export const posts = (
	state = initialState,
	action: PostActionTypes
): InitialState => {
	switch (action.type) {
		// LOAD MORE POSTS

		case "LOAD_MORE_POSTS_REQUEST": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					loadingPosts: true,
				},
			};
		}
		case "LOAD_MORE_POSTS_SUCCESS": {
			const { hasMorePosts, posts, isCurrentUser } = action.payload;

			return {
				...state,
				isLoading: {
					...state.isLoading,
					loadingPosts: false,
				},

				posts: isCurrentUser ? [...state.posts, ...posts] : [],
				displayedUserPosts: !isCurrentUser
					? [...state.displayedUserPosts, ...posts]
					: [],

				hasMorePosts: isCurrentUser ? hasMorePosts : true,
				hasMoreDisplayedUserPosts: !isCurrentUser ? hasMorePosts : true,
			};
		}
		case "LOAD_MORE_POSTS_FAILURE": {
			return {
				...state,
				isLoading: {
					...state.isLoading,
					loadingPosts: false,
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
				posts: [action.payload, ...state.posts],
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
			const newPosts = state.posts.filter(
				(post) => post.postId !== action.postId
			);

			return {
				...state,
				isLoading: {
					...state.isLoading,
					deletePost: false,
				},
				posts: newPosts,
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
			const newPosts = state.posts.map((post) => {
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
				posts: newPosts,
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

		// WEB SOCKET ACTIONS

		case "NEW_POST_ADDED": {
			return {
				...state,
				displayedUserPosts: [
					action.payload,
					...state.displayedUserPosts,
				],
			};
		}
		case "DELETE_POST": {
			const newPosts = state.displayedUserPosts.filter(
				(post) => post.postId !== action.postId
			);
			return {
				...state,
				displayedUserPosts: newPosts,
			};
		}
		case "POST_UPDATED": {
			let newPosts: PostType[] = [];

			if (action.payload.action === "UPDATE") {
				const { updatedPost } = action.payload;

				if (
					state.displayedUserPosts.some(
						(post) => post.postId === updatedPost.postId
					)
				) {
					newPosts = state.displayedUserPosts.map((post) => {
						if (post.postId === updatedPost.postId) {
							return {
								...post,
								postText: updatedPost.postText,
								isPublic: updatedPost.isPublic,
							};
						}
						return post;
					});
				} else {
					newPosts = [...state.displayedUserPosts, updatedPost];
				}
			} else if (action.payload.action === "REMOVE") {
				const { postId } = action.payload;
				newPosts = state.displayedUserPosts.filter(
					(post) => post.postId !== postId
				);
			}

			return {
				...state,
				displayedUserPosts: newPosts,
			};
		}

		default: {
			return {
				...state,
			};
		}
	}
};
