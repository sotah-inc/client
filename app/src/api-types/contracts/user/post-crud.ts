import { IPostJson } from "../../entities";

export interface ICreatePostRequest {
    title: string;
    slug: string;
    body: string;
}

export interface ICreatePostResponse {
    post: IPostJson;
}

export type IUpdatePostRequest = ICreatePostRequest;

export type IUpdatePostResponse = ICreatePostResponse;

export interface IGetPostsResponse {
    posts: IPostJson[];
}
