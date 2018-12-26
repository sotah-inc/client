import { IPostJson } from "@app/api-types/entities";
import { FetchLevel } from "./main";

export interface IPostsState {
    posts: IPostJson[];
    createPostLevel: FetchLevel;
    currentPost: IPostJson | null;
}

export const defaultPostsState: IPostsState = {
    createPostLevel: FetchLevel.initial,
    currentPost: null,
    posts: [],
};
