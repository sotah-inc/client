import { Dispatch } from "redux";

import { ICreatePostRequest } from "@app/api-types/contracts/user/post-crud";
import { createPost, ICreatePostResult } from "@app/api/posts";
import { ActionsUnion, createAction } from "./helpers";

export const REQUEST_CREATE_POST = "REQUEST_CREATE_POST";
export const RECEIVE_CREATE_POST = "RECEIVE_CREATE_POST";
const RequestCreatePost = () => createAction(REQUEST_CREATE_POST);
const ReceiveCreatePost = (payload: ICreatePostResult | null) => createAction(RECEIVE_CREATE_POST, payload);
type FetchCreatePostType = ReturnType<typeof RequestCreatePost | typeof ReceiveCreatePost>;
export const FetchAuctions = (token: string, request: ICreatePostRequest) => {
    return async (dispatch: Dispatch<FetchCreatePostType>) => {
        dispatch(RequestCreatePost());
        dispatch(ReceiveCreatePost(await createPost(token, request)));
    };
};

export const PostsActions = {
    ReceiveCreatePost,
    RequestCreatePost,
};

export type PostsActions = ActionsUnion<typeof PostsActions>;
