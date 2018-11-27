import { Dispatch } from "redux";

import { IGetBootResponse } from "@app/api-types/contracts/data";
import { ICreatePreferencesRequest, IUpdatePreferencesRequest } from "@app/api-types/contracts/user/preferences";
import { IRealm, IRegion } from "@app/api-types/region";
import { getBoot, getPing, getStatus } from "@app/api/data";
import {
    createPreferences,
    getPreferences,
    ICreatePreferencesResult,
    IGetPreferencesResult,
    IReloadUserResponse,
    IUpdatePreferencesResult,
    reloadUser,
    updatePreferences,
} from "@app/api/user";
import { IProfile } from "@app/types/global";
import { AuthLevel } from "@app/types/main";
import { ActionsUnion, createAction } from "./helpers";

export const REQUEST_GET_PING = "REQUEST_GET_PING";
export const RECEIVE_GET_PING = "RECEIVE_GET_PING";
export const RequestGetPing = () => createAction(REQUEST_GET_PING);
export const ReceiveGetPing = (payload: boolean) => createAction(RECEIVE_GET_PING, payload);
type FetchGetPingType = ReturnType<typeof RequestGetPing | typeof ReceiveGetPing>;
export const FetchGetPing = () => {
    return async (dispatch: Dispatch<FetchGetPingType>) => {
        dispatch(RequestGetPing());
        dispatch(ReceiveGetPing(await getPing()));
    };
};

export const USER_REGISTER = "USER_REGISTER";
export const UserRegister = (payload: IProfile) => createAction(USER_REGISTER, payload);

export const USER_LOGIN = "USER_LOGIN";
export const UserLogin = (payload: IProfile) => createAction(USER_LOGIN, payload);

export const REQUEST_USER_RELOAD = "REQUEST_USER_RELOAD";
export const RECEIVE_USER_RELOAD = "RECEIVE_USER_RELOAD";
const RequestUserReload = () => createAction(REQUEST_USER_RELOAD);
const ReceiveUserReload = (payload: IReloadUserResponse) => createAction(RECEIVE_USER_RELOAD, payload);
type FetchUserReloadType = ReturnType<typeof RequestUserReload | typeof ReceiveUserReload>;
export const FetchUserReload = (token: string) => {
    return async (dispatch: Dispatch<FetchUserReloadType>) => {
        dispatch(RequestUserReload());
        dispatch(ReceiveUserReload(await reloadUser(token)));
    };
};

export const CHANGE_AUTH_LEVEL = "CHANGE_AUTH_LEVEL";
export const ChangeAuthLevel = (payload: AuthLevel) => createAction(CHANGE_AUTH_LEVEL, payload);

export const REQUEST_GET_USERPREFERENCES = "REQUEST_GET_USERPREFERENCES";
export const RECEIVE_GET_USERPREFERENCES = "RECEIVE_GET_USERPREFERENCES";
export const RequestGetUserPreferences = () => createAction(REQUEST_GET_USERPREFERENCES);
export const ReceiveGetUserPreferences = (payload: IGetPreferencesResult) =>
    createAction(RECEIVE_GET_USERPREFERENCES, payload);
type FetchGetUserPreferencesType = ReturnType<typeof RequestGetUserPreferences | typeof ReceiveGetUserPreferences>;
export const FetchGetUserPreferences = (token: string) => {
    return async (dispatch: Dispatch<FetchGetUserPreferencesType>) => {
        dispatch(RequestGetUserPreferences());
        dispatch(ReceiveGetUserPreferences(await getPreferences(token)));
    };
};

export const REQUEST_USER_PREFERENCES_CREATE = "REQUEST_USER_PREFERENCES_CREATE";
export const RECEIVE_USER_PREFERENCES_CREATE = "RECEIVE_USER_PREFERENCES_CREATE";
const RequestUserPreferencesCreate = () => createAction(REQUEST_USER_PREFERENCES_CREATE);
const ReceiveUserPreferencesCreate = (payload: ICreatePreferencesResult) =>
    createAction(RECEIVE_USER_PREFERENCES_CREATE, payload);
type FetchUserPreferencesCreateType = ReturnType<
    typeof RequestUserPreferencesCreate | typeof ReceiveUserPreferencesCreate
>;
export const FetchUserPreferencesCreate = (token: string, body: ICreatePreferencesRequest) => {
    return async (dispatch: Dispatch<FetchUserPreferencesCreateType>) => {
        dispatch(RequestUserPreferencesCreate());
        dispatch(ReceiveUserPreferencesCreate(await createPreferences(token, body)));
    };
};

export const REQUEST_USER_PREFERENCES_UPDATE = "REQUEST_USER_PREFERENCES_UPDATE";
export const RECEIVE_USER_PREFERENCES_UPDATE = "RECEIVE_USER_PREFERENCES_UPDATE";
const RequestUserPreferencesUpdate = () => createAction(REQUEST_USER_PREFERENCES_UPDATE);
const ReceiveUserPreferencesUpdate = (payload: IUpdatePreferencesResult) =>
    createAction(RECEIVE_USER_PREFERENCES_UPDATE, payload);
type FetchUserPreferencesUpdateType = ReturnType<
    typeof RequestUserPreferencesUpdate | typeof ReceiveUserPreferencesUpdate
>;
export const FetchUserPreferencesUpdate = (token: string, body: IUpdatePreferencesRequest) => {
    return async (dispatch: Dispatch<FetchUserPreferencesUpdateType>) => {
        dispatch(RequestUserPreferencesUpdate());
        dispatch(ReceiveUserPreferencesUpdate(await updatePreferences(token, body)));
    };
};

export const REQUEST_GET_BOOT = "REQUEST_GET_BOOT";
export const RECEIVE_GET_BOOT = "RECEIVE_GET_BOOT";
export const RequestGetBoot = () => createAction(REQUEST_GET_BOOT);
export const ReceiveGetBoot = (payload: IGetBootResponse | null) => createAction(RECEIVE_GET_BOOT, payload);
type FetchGetBootType = ReturnType<typeof RequestGetBoot | typeof ReceiveGetBoot>;
export const FetchGetBoot = () => {
    return async (dispatch: Dispatch<FetchGetBootType>) => {
        dispatch(RequestGetBoot());
        dispatch(ReceiveGetBoot(await getBoot()));
    };
};

export const REGION_CHANGE = "REGION_CHANGE";
export const RegionChange = (payload: IRegion) => createAction(REGION_CHANGE, payload);

export const REQUEST_GET_REALMS = "REQUEST_GET_REALMS";
export const RECEIVE_GET_REALMS = "RECEIVE_GET_REALMS";
export const RequestGetRealms = () => createAction(REQUEST_GET_REALMS);
export const ReceiveGetRealms = (payload: IRealm[] | null) => createAction(RECEIVE_GET_REALMS, payload);
type FetchGetRealmType = ReturnType<typeof RequestGetRealms | typeof ReceiveGetRealms>;
export const FetchGetRealms = (region: IRegion) => {
    return async (dispatch: Dispatch<FetchGetRealmType>) => {
        dispatch(RequestGetRealms());
        dispatch(ReceiveGetRealms(await getStatus(region.name)));
    };
};

export const REALM_CHANGE = "REALM_CHANGE";
export const RealmChange = (payload: IRealm) => createAction(REALM_CHANGE, payload);

export const CHANGE_IS_LOGIN_DIALOG_OPEN = "CHANGE_IS_LOGIN_DIALOG_OPEN";
export const ChangeIsLoginDialogOpen = (payload: boolean) => createAction(CHANGE_IS_LOGIN_DIALOG_OPEN, payload);

export const MainActions = {
    ChangeAuthLevel,
    ChangeIsLoginDialogOpen,
    RealmChange,
    ReceiveGetBoot,
    ReceiveGetPing,
    ReceiveGetRealms,
    ReceiveGetUserPreferences,
    ReceiveUserReload,
    RegionChange,
    RequestGetBoot,
    RequestGetPing,
    RequestGetRealms,
    RequestGetUserPreferences,
    RequestUserReload,
    UserLogin,
    UserRegister,
};

export type MainActions = ActionsUnion<typeof MainActions>;
