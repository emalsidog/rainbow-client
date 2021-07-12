import { RootState } from "../store";
import { Chat } from "./types";

// GET CHATS
export const selectChats = (state: RootState): Chat[] => state.chats.chats;
