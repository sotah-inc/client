import { IPostJson } from "@app/api-types/entities";
import { FetchLevel } from "./main";

export interface IPostsState {
    getPostsLevel: FetchLevel;
    posts: IPostJson[];
    createPostLevel: FetchLevel;
    createPostErrors: {
        [key: string]: string;
    };
    updatePostLevel: FetchLevel;
    updatePostErrors: {
        [key: string]: string;
    };
    currentPost: IPostJson | null;
    getPostLevel: FetchLevel;
}

export const defaultPostsState: IPostsState = {
    createPostErrors: {},
    createPostLevel: FetchLevel.initial,
    currentPost: null,
    getPostLevel: FetchLevel.initial,
    getPostsLevel: FetchLevel.initial,
    posts: [],
    updatePostErrors: {},
    updatePostLevel: FetchLevel.initial,
};
