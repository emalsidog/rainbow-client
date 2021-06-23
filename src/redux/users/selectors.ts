// Types
import { User } from "../common-types";
import { RootState } from "../store";

// IS LAODING
export const selectIsLoading = (state: RootState): boolean => state.users.isLoading;

// IS CURRENT USER
export const selectIsCurrentUser = (state: RootState): boolean | undefined => state.users.isCurrenUser;

// USER
export const selectUser = (state: RootState): User => state.users.user;

// USERS
export const selectUsers = (state: RootState): User[] => state.users.users;

// TOTAL USERS
export const selectHasMoreData = (state: RootState) => state.users.hasMoreData;