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

export const REQUEST_PING = "REQUEST_PING";
export const RECEIVE_PING = "RECEIVE_PING";
const RequestPing = () => createAction(REQUEST_PING);
const ReceivePing = (payload: boolean) => createAction(RECEIVE_PING, payload);
type FetchPingType = ReturnType<typeof RequestPing | typeof ReceivePing>;
export const FetchPing = () => {
    return async (dispatch: Dispatch<FetchPingType>) => {
        dispatch(RequestPing());
        dispatch(ReceivePing(await getPing()));
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

export const REQUEST_USER_PREFERENCES = "REQUEST_USER_PREFERENCES";
export const RECEIVE_USER_PREFERENCES = "RECEIVE_USER_PREFERENCES";
const RequestUserPreferences = () => createAction(REQUEST_USER_PREFERENCES);
const ReceiveUserPreferences = (payload: IGetPreferencesResult) => createAction(RECEIVE_USER_PREFERENCES, payload);
type FetchUserPreferencesType = ReturnType<typeof RequestUserPreferences | typeof ReceiveUserPreferences>;
export const FetchUserPreferences = (token: string) => {
    return async (dispatch: Dispatch<FetchUserPreferencesType>) => {
        dispatch(RequestUserPreferences());
        dispatch(ReceiveUserPreferences(await getPreferences(token)));
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

export const REQUEST_BOOT = "REQUEST_BOOT";
export const RECEIVE_BOOT = "RECEIVE_BOOT";
const RequestBoot = () => createAction(REQUEST_BOOT);
const ReceiveBoot = (payload: IGetBootResponse | null) => createAction(RECEIVE_BOOT, payload);
type FetchBootType = ReturnType<typeof RequestBoot | typeof ReceiveBoot>;
export const FetchBoot = () => {
    return async (dispatch: Dispatch<FetchBootType>) => {
        dispatch(RequestBoot());
        dispatch(ReceiveBoot(await getBoot()));
    };
};

export const REGION_CHANGE = "REGION_CHANGE";
export const RegionChange = (payload: IRegion) => createAction(REGION_CHANGE, payload);

export const REQUEST_REALMS = "REQUEST_REALMS";
export const RECEIVE_REALMS = "RECEIVE_REALMS";
const RequestRealms = () => createAction(REQUEST_REALMS);
const ReceiveRealms = (payload: IRealm[] | null) => createAction(RECEIVE_REALMS, payload);
type FetchRealmType = ReturnType<typeof RequestRealms | typeof ReceiveRealms>;
export const FetchRealms = (region: IRegion) => {
    return async (dispatch: Dispatch<FetchRealmType>) => {
        dispatch(RequestRealms());
        dispatch(ReceiveRealms(await getStatus(region.name)));
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
    ReceiveBoot,
    ReceivePing,
    ReceiveRealms,
    ReceiveUserPreferences,
    ReceiveUserReload,
    RegionChange,
    RequestBoot,
    RequestPing,
    RequestRealms,
    RequestUserPreferences,
    RequestUserReload,
    UserLogin,
    UserRegister,
};

export type MainActions = ActionsUnion<typeof MainActions>;
