import { Dispatch } from "redux";

import { IGetPostResponse } from "@app/api-types/contracts/data";
import { ICreatePostRequest, IUpdatePostRequest } from "@app/api-types/contracts/user/post-crud";
import { IPostJson } from "@app/api-types/entities";
import { getPosts, IGetPostsResult } from "@app/api/data";
import { createPost, getPost, ICreatePostResult, IUpdatePostResult, updatePost } from "@app/api/posts";
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

export const REQUEST_UPDATE_POST = "REQUEST_UPDATE_POST";
export const RECEIVE_UPDATE_POST = "RECEIVE_UPDATE_POST";
export const RequestUpdatePost = () => createAction(REQUEST_UPDATE_POST);
export const ReceiveUpdatePost = (payload: IUpdatePostResult) => createAction(RECEIVE_UPDATE_POST, payload);
type FetchUpdatePostType = ReturnType<typeof RequestUpdatePost | typeof ReceiveUpdatePost>;
export const FetchUpdatePost = (token: string, id: number, request: IUpdatePostRequest) => {
    return async (dispatch: Dispatch<FetchUpdatePostType>) => {
        dispatch(RequestUpdatePost());
        dispatch(ReceiveUpdatePost(await updatePost(token, id, request)));
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

export const REQUEST_GET_POST = "REQUEST_GET_POST";
export const RECEIVE_GET_POST = "RECEIVE_GET_POST";
export const RequestGetPost = () => createAction(REQUEST_GET_POST);
export const ReceiveGetPost = (payload: IGetPostResponse | null) => createAction(RECEIVE_GET_POST, payload);
type FetchGetPostType = ReturnType<typeof RequestGetPost | typeof ReceiveGetPost>;
export const FetchGetPost = (id: number) => {
    return async (dispatch: Dispatch<FetchGetPostType>) => {
        dispatch(RequestGetPost());
        dispatch(ReceiveGetPost(await getPost(id)));
    };
};

export const CHANGE_POST = "CHANGE_POST";
export const ChangePost = (payload: IPostJson) => createAction(CHANGE_POST, payload);

export const PostsActions = {
    ChangePost,
    ReceiveCreatePost,
    ReceiveGetPosts,
    RequestCreatePost,
    RequestGetPosts,
};

export type PostsActions = ActionsUnion<typeof PostsActions>;
