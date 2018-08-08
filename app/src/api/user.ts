import * as HTTPStatus from "http-status";

import { IErrors, IUser, IUserPreferences, RealmSlug, RegionName } from "../types/global";
import { apiEndpoint } from "./index";

interface IRegisterUserResponse {
    profile: {
        user: IUser;
        token: string;
    } | null;
    errors: IErrors | null;
}

export const registerUser = async (email: string, password: string): Promise<IRegisterUserResponse> => {
    const res = await fetch(`${apiEndpoint}/users`, {
        body: JSON.stringify({ email, password }),
        headers: new Headers({ "content-type": "application/json" }),
        method: "POST",
    });
    if (res.status === HTTPStatus.BAD_REQUEST) {
        return {
            errors: await res.json(),
            profile: null,
        };
    }

    return { profile: await res.json(), errors: null };
};

export type LoginUserResponse = IRegisterUserResponse;

export const loginUser = async (email: string, password: string): Promise<LoginUserResponse> => {
    const res = await fetch(`${apiEndpoint}/login`, {
        body: JSON.stringify({ email, password }),
        headers: new Headers({ "content-type": "application/json" }),
        method: "POST",
    });
    switch (res.status) {
        case HTTPStatus.OK:
            return { profile: await res.json(), errors: null };
        case HTTPStatus.BAD_REQUEST:
            return { errors: await res.json(), profile: null };
        case HTTPStatus.INTERNAL_SERVER_ERROR:
            return { errors: { email: "There was a server error." }, profile: null };
        default:
            return { errors: { email: "There was an unknown error." }, profile: null };
    }
};

export interface IReloadUserResponse {
    user: IUser | null;
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

export interface IGetPreferencesResponse {
    preference: IUserPreferences | null;
    error: string | null;
}

export const getPreferences = async (token: string): Promise<IGetPreferencesResponse> => {
    const res = await fetch(`${apiEndpoint}/user/preferences`, {
        headers: new Headers({
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        }),
        method: "GET",
    });
    switch (res.status) {
        case HTTPStatus.UNAUTHORIZED:
            return { error: "Unauthorized", preference: null };
        case HTTPStatus.NOT_FOUND:
            return { error: null, preference: null };
        default:
            break;
    }

    return { preference: (await res.json()).preference, error: null };
};

export interface ICreatePreferencesRequestBody {
    current_region?: RegionName;
    current_realm?: RealmSlug;
}

interface ICreatePreferencesResponse {
    preference: IUserPreferences | null;
    error: string | null;
}

export const createPreferences = async (
    token: string,
    body: ICreatePreferencesRequestBody,
): Promise<ICreatePreferencesResponse> => {
    const res = await fetch(`${apiEndpoint}/user/preferences`, {
        body: JSON.stringify(body),
        headers: new Headers({
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        }),
        method: "POST",
    });
    if (res.status === HTTPStatus.UNAUTHORIZED) {
        return { error: "Unauthorized", preference: null };
    }

    return { preference: (await res.json()).preference, error: null };
};

export type UpdatePreferencesRequestBody = ICreatePreferencesRequestBody;

export type UpdatePreferencesResponse = ICreatePreferencesResponse;

export const updatePreferences = async (
    token: string,
    body: UpdatePreferencesRequestBody,
): Promise<UpdatePreferencesResponse> => {
    const res = await fetch(`${apiEndpoint}/user/preferences`, {
        body: JSON.stringify(body),
        headers: new Headers({
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        }),
        method: "PUT",
    });
    if (res.status === HTTPStatus.UNAUTHORIZED) {
        return { error: "Unauthorized", preference: null };
    }

    return { preference: (await res.json()).preference, error: null };
};
