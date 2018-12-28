import { IPostJson } from "../../entities";

export interface ICreatePostRequest {
    title: string;
    slug: string;
    body: string;
    summary: string;
}

export interface ICreatePostResponse {
    post: IPostJson;
}

export type IUpdatePostRequest = ICreatePostRequest;

export type IUpdatePostResponse = ICreatePostResponse;
