import * as HTTPStatus from "http-status";

import { IErrorResponse, IValidationErrorResponse } from "@app/api-types/contracts";
import { ICreatePostRequest, ICreatePostResponse } from "@app/api-types/contracts/user/post-crud";
import { IPostJson } from "@app/api-types/entities";
import { apiEndpoint, gather } from "./index";

export interface ICreatePostResult {
    post: IPostJson | null;
    error: string | null;
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

    return { post: (body as ICreatePostResponse).post, error: null };
};
