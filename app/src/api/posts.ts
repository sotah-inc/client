import * as HTTPStatus from "http-status";

import { IErrorResponse, IValidationErrorResponse } from "@app/api-types/contracts";
import { IGetPostResponse } from "@app/api-types/contracts/data";
import {
    ICreatePostRequest,
    ICreatePostResponse,
    IUpdatePostRequest,
    IUpdatePostResponse,
} from "@app/api-types/contracts/user/post-crud";
import { IPostJson } from "@app/api-types/entities";
import { apiEndpoint, gather } from "./index";

export interface ICreatePostResult {
    post: IPostJson | null;
    error?: string;
    errors?: {
        [key: string]: string;
    };
}

export const createPost = async (token: string, request: ICreatePostRequest): Promise<ICreatePostResult> => {
    const { body, status } = await gather<
        ICreatePostRequest,
        ICreatePostResponse | IErrorResponse | IValidationErrorResponse
    >({
        body: request,
        headers: new Headers({
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        }),
        method: "POST",
        url: `${apiEndpoint}/user/posts`,
    });
    if (status === HTTPStatus.UNAUTHORIZED) {
        return { error: "Unauthorized", post: null };
    }
    switch (status) {
        case HTTPStatus.CREATED:
            break;
        case HTTPStatus.UNAUTHORIZED:
            return { error: "Unauthorized", post: null };
        case HTTPStatus.BAD_REQUEST:
            return { errors: body as IValidationErrorResponse, post: null };
        default:
            return { error: "Failure", post: null };
    }

    return { post: (body as ICreatePostResponse).post };
};

export interface IUpdatePostResult {
    post: IPostJson | null;
    error?: string;
    errors?: {
        [key: string]: string;
    };
}

export const updatePost = async (
    token: string,
    id: number,
    request: IUpdatePostRequest,
): Promise<IUpdatePostResult> => {
    const { body, status } = await gather<
        IUpdatePostRequest,
        IUpdatePostResponse | IErrorResponse | IValidationErrorResponse
    >({
        body: request,
        headers: new Headers({
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        }),
        method: "PUT",
        url: `${apiEndpoint}/user/posts/${id}`,
    });
    if (status === HTTPStatus.UNAUTHORIZED) {
        return { error: "Unauthorized", post: null };
    }
    switch (status) {
        case HTTPStatus.OK:
            break;
        case HTTPStatus.UNAUTHORIZED:
            return { error: "Unauthorized", post: null };
        case HTTPStatus.BAD_REQUEST:
            return { errors: body as IValidationErrorResponse, post: null };
        default:
            return { error: "Failure", post: null };
    }

    return { post: (body as IUpdatePostResponse).post };
};

export const getPost = async (slug: string): Promise<IGetPostResponse | null> => {
    const { body, status } = await gather<null, IGetPostResponse | IErrorResponse>({
        headers: new Headers({
            "content-type": "application/json",
        }),
        url: `${apiEndpoint}/posts/${slug}`,
    });
    switch (status) {
        case HTTPStatus.OK:
            break;
        default:
            return null;
    }

    return { post: (body as IGetPostResponse).post };
};

export const deletePost = async (token: string, id: number): Promise<number | null> => {
    const { status } = await gather<null, null>({
        headers: new Headers({
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        }),
        method: "DELETE",
        url: `${apiEndpoint}/user/posts/${id}`,
    });
    switch (status) {
        case HTTPStatus.OK:
            return id;
        default:
            return null;
    }
};
