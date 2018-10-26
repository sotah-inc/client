import * as HTTPStatus from "http-status";

import { IErrorResponse, IValidationErrorResponse } from "@app/api-types/contracts";
import { ICreateUserRequest, ICreateUserResponse, ILoginRequest, ILoginResponse } from "@app/api-types/contracts/user";
import {
    ICreatePreferencesRequest,
    ICreatePreferencesResponse,
    IGetPreferencesResponse,
    IUpdatePreferencesRequest,
    IUpdatePreferencesResponse,
} from "@app/api-types/contracts/user/preferences";
import { IPreferenceJson, IUserJson } from "@app/api-types/entities";
import { apiEndpoint, gather } from "./index";

interface IRegisterUserResult {
    data: ICreateUserResponse | null;
    errors: IValidationErrorResponse | null;
}

export const registerUser = async (email: string, password: string): Promise<IRegisterUserResult> => {
    const { body, status } = await gather<ICreateUserRequest, ICreateUserResponse | IValidationErrorResponse>({
        body: { email, password },
        method: "POST",
        url: `${apiEndpoint}/users`,
    });
    switch (status) {
        case HTTPStatus.CREATED:
            return { errors: null, data: body as ICreateUserResponse };
        case HTTPStatus.BAD_REQUEST:
            return { errors: body as IValidationErrorResponse, data: null };
        case HTTPStatus.INTERNAL_SERVER_ERROR:
            return { errors: { email: "There was a server error." }, data: null };
        default:
            return { errors: { email: "There was an unknown error." }, data: null };
    }
};

interface ILoginResult {
    data: ILoginResponse | null;
    errors: IValidationErrorResponse | null;
}

export const loginUser = async (email: string, password: string): Promise<ILoginResult> => {
    const { body, status } = await gather<ILoginRequest, ILoginResponse | IValidationErrorResponse>({
        body: { email, password },
        method: "POST",
        url: `${apiEndpoint}/login`,
    });
    switch (status) {
        case HTTPStatus.OK:
            return { errors: null, data: body as ILoginResponse };
        case HTTPStatus.BAD_REQUEST:
            return { errors: body as IValidationErrorResponse, data: null };
        case HTTPStatus.INTERNAL_SERVER_ERROR:
            return { errors: { email: "There was a server error." }, data: null };
        default:
            return { errors: { email: "There was an unknown error." }, data: null };
    }
};

export interface IReloadUserResponse {
    user: IUserJson | null;
    error: string | null;
}

export const reloadUser = async (token: string): Promise<IReloadUserResponse> => {
    const res = await fetch(`${apiEndpoint}/user`, {
        headers: new Headers({
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        }),
        method: "GET",
    });
    if (res.status === HTTPStatus.UNAUTHORIZED) {
        return { error: "Unauthorized", user: null };
    }

    return { user: await res.json(), error: null };
};

export interface IGetPreferencesResult {
    preference: IPreferenceJson | null;
    error: string | null;
}

export const getPreferences = async (token: string): Promise<IGetPreferencesResult> => {
    const { body, status } = await gather<null, IGetPreferencesResponse>({
        headers: new Headers({
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        }),
        url: `${apiEndpoint}/user/preferences`,
    });
    switch (status) {
        case HTTPStatus.UNAUTHORIZED:
            return { error: "Unauthorized", preference: null };
        case HTTPStatus.NOT_FOUND:
            return { error: null, preference: null };
        default:
            break;
    }

    return { preference: body.preference, error: null };
};

export interface ICreatePreferencesResult {
    preference: IPreferenceJson | null;
    error: string | null;
}

export const createPreferences = async (
    token: string,
    request: ICreatePreferencesRequest,
): Promise<ICreatePreferencesResult> => {
    const { body, status } = await gather<
        ICreatePreferencesRequest,
        ICreatePreferencesResponse | IErrorResponse | IValidationErrorResponse
    >({
        body: request,
        headers: new Headers({
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        }),
        method: "POST",
        url: `${apiEndpoint}/user/preferences`,
    });
    if (status === HTTPStatus.UNAUTHORIZED) {
        return { error: "Unauthorized", preference: null };
    }

    return { preference: (body as ICreatePreferencesResponse).preference, error: null };
};

export interface IUpdatePreferencesResult {
    data: IPreferenceJson | null;
    error: string | null;
}

export const updatePreferences = async (
    token: string,
    request: IUpdatePreferencesRequest,
): Promise<IUpdatePreferencesResult> => {
    const { body, status } = await gather<IUpdatePreferencesRequest, IUpdatePreferencesResponse>({
        body: request,
        headers: new Headers({
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        }),
        method: "PUT",
        url: `${apiEndpoint}/user/preferences`,
    });
    if (status === HTTPStatus.UNAUTHORIZED) {
        return { error: "Unauthorized", data: null };
    }

    return { data: body.preference, error: null };
};
