import { Dispatch } from "redux";

import { ICreatePostRequest } from "@app/api-types/contracts/user/post-crud";
import { createPost, getPosts, ICreatePostResult, IGetPostsResult } from "@app/api/posts";
import { ActionsUnion, createAction } from "./helpers";

export const REQUEST_CREATE_POST = "REQUEST_CREATE_POST";
export const RECEIVE_CREATE_POST = "RECEIVE_CREATE_POST";
export const RequestCreatePost = () => createAction(REQUEST_CREATE_POST);
export const ReceiveCreatePost = (payload: ICreatePostResult) => createAction(RECEIVE_CREATE_POST, payload);
type FetchCreatePostType = ReturnType<typeof RequestCreatePost | typeof ReceiveCreatePost>;
export const FetchCreatePost = (token: string, request: ICreatePostRequest) => {
    return async (dispatch: Dispatch<FetchCreatePostType>) => {
        dispatch(RequestCreatePost());
        dispatch(ReceiveCreatePost(await createPost(token, request)));
    };
};

export const REQUEST_GET_POSTS = "REQUEST_GET_POSTS";
export const RECEIVE_GET_POSTS = "RECEIVE_GET_POSTS";
export const RequestGetPosts = () => createAction(REQUEST_GET_POSTS);
export const ReceiveGetPosts = (payload: IGetPostsResult) => createAction(RECEIVE_GET_POSTS, payload);
type FetchGetPostsType = ReturnType<typeof RequestGetPosts | typeof ReceiveGetPosts>;
export const FetchGetPosts = () => {
    return async (dispatch: Dispatch<FetchGetPostsType>) => {
        dispatch(RequestGetPosts());
        dispatch(ReceiveGetPosts(await getPosts()));
    };
};

export const PostsActions = {
    ReceiveCreatePost,
    ReceiveGetPosts,
    RequestCreatePost,
    RequestGetPosts,
};

export type PostsActions = ActionsUnion<typeof PostsActions>;
