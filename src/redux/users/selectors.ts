// Types
import { User } from "./types";
import { RootState } from "../store";

// IS LAODING
export const selectIsLoading = (state: RootState): boolean => state.users.isLoading;

// IS CURRENT USER
export const selectIsCurrentUser = (state: RootState): boolean | undefined => state.users.isCurrenUser;

// USER
export const selectUser = (state: RootState): User => state.users.user;