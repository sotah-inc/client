import { IPostJson } from "../../entities";

export interface ICreatePostRequest {
    title: string;
    body: string;
}

export interface ICreatePostResponse {
    post: IPostJson;
}

export type IUpdatePostRequest = ICreatePostRequest;

export type IUpdatePostResponse = ICreatePostResponse;
