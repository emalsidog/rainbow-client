import { PostActionTypes } from "./types";
import { postsWatcher } from "./saga";
import { posts } from "./reducer";

export { postsWatcher, posts };
export type { PostActionTypes };
