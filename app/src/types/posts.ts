import { IPostJson } from "@app/api-types/entities";
import { FetchLevel } from "./main";

export interface IPostsState {
    posts: IPostJson[];
    createPostLevel: FetchLevel;
    createPostErrors: {
        [key: string]: string;
    };
    currentPost: IPostJson | null;
}

export const defaultPostsState: IPostsState = {
    createPostErrors: {},
    createPostLevel: FetchLevel.initial,
    currentPost: null,
    posts: [],
};
