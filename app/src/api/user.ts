import * as HTTPStatus from "http-status";

import { Errors, RealmSlug, RegionName, User, UserPreferences } from "../types/global";
import { apiEndpoint } from "./index";

export interface RegisterUserResponse {
    profile: {
        user: User;
        token: string;
    } | null;
    errors: Errors | null;
}

export const registerUser = async (email: string, password: string): Promise<RegisterUserResponse> => {
    const res = await fetch(`${apiEndpoint}/users`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: new Headers({ "content-type": "application/json" }),
    });
    if (res.status === HTTPStatus.BAD_REQUEST) {
        return {
            profile: null,
            errors: await res.json(),
        };
    }

    return { profile: await res.json(), errors: null };
};

export type LoginUserResponse = RegisterUserResponse;

export const loginUser = async (email: string, password: string): Promise<LoginUserResponse> => {
    const res = await fetch(`${apiEndpoint}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: new Headers({ "content-type": "application/json" }),
    });
    if (res.status === HTTPStatus.BAD_REQUEST) {
        return {
            profile: null,
            errors: await res.json(),
        };
    }

    return { profile: await res.json(), errors: null };
};

export interface ReloadUserResponse {
    user: User | null;
    error: string | null;
}

export const reloadUser = async (token: string): Promise<ReloadUserResponse> => {
    const res = await fetch(`${apiEndpoint}/user`, {
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        }),
    });
    if (res.status === HTTPStatus.UNAUTHORIZED) {
        return {
            user: null,
            error: "Unauthorized",
        };
    }

    return { user: await res.json(), error: null };
};

export interface GetPreferencesResponse {
    preference: UserPreferences | null;
    error: string | null;
}

export const getPreferences = async (token: string): Promise<GetPreferencesResponse> => {
    const res = await fetch(`${apiEndpoint}/user/preferences`, {
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        }),
    });
    switch (res.status) {
        case HTTPStatus.UNAUTHORIZED:
            return {
                preference: null,
                error: "Unauthorized",
            };
        case HTTPStatus.NOT_FOUND:
            return {
                preference: null,
                error: null,
            };
        default:
            break;
    }

    return { preference: (await res.json()).preference, error: null };
};

export interface CreatePreferencesRequestBody {
    current_region?: RegionName;
    current_realm?: RealmSlug;
}

export interface CreatePreferencesResponse {
    preference: UserPreferences | null;
    error: string | null;
}

export const createPreferences = async (
    token: string,
    body: CreatePreferencesRequestBody,
): Promise<CreatePreferencesResponse> => {
    const res = await fetch(`${apiEndpoint}/user/preferences`, {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        }),
        body: JSON.stringify(body),
    });
    if (res.status === HTTPStatus.UNAUTHORIZED) {
        return {
            preference: null,
            error: "Unauthorized",
        };
    }

    return { preference: (await res.json()).preference, error: null };
};

export type UpdatePreferencesRequestBody = CreatePreferencesRequestBody;

export type UpdatePreferencesResponse = CreatePreferencesResponse;

export const updatePreferences = async (
    token: string,
    body: UpdatePreferencesRequestBody,
): Promise<UpdatePreferencesResponse> => {
    const res = await fetch(`${apiEndpoint}/user/preferences`, {
        method: "PUT",
        headers: new Headers({
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        }),
        body: JSON.stringify(body),
    });
    if (res.status === HTTPStatus.UNAUTHORIZED) {
        return {
            preference: null,
            error: "Unauthorized",
        };
    }

    return { preference: (await res.json()).preference, error: null };
};
