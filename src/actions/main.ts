import { Dispatch } from 'redux';

import { createAction, ActionsUnion } from './helpers';
import { Profile, Region, Realm } from '../types/global';
import { getPing, getStatus, getRegions,  } from '../api/data';
import {
  ReloadUserResponse,
  reloadUser,
  getPreferences,
  GetPreferencesResponse,
  CreatePreferencesRequestBody,
  createPreferences
} from '../api/user';

export const REQUEST_PING = 'REQUEST_PING';
export const RECEIVE_PING = 'RECEIVE_PING';
const RequestPing = () => createAction(REQUEST_PING);
const ReceivePing = (payload: boolean) => createAction(RECEIVE_PING, payload);
type FetchPingType = ReturnType<typeof RequestPing | typeof ReceivePing>;
export const FetchPing = () => {
  return async (dispatch: Dispatch<FetchPingType>) => {
    dispatch(RequestPing());
    dispatch(ReceivePing(await getPing()));
  };
};

export const USER_REGISTER = 'USER_REGISTER';
export const UserRegister = (payload: Profile) => createAction(USER_REGISTER, payload);

export const USER_LOGIN = 'USER_LOGIN';
export const UserLogin = (payload: Profile) => createAction(USER_LOGIN, payload);

export const REQUEST_USER_RELOAD = 'REQUEST_USER_RELOAD';
export const RECEIVE_USER_RELOAD = 'RECEIVE_USER_RELOAD';
const RequestUserReload = () => createAction(REQUEST_USER_RELOAD);
const ReceiveUserReload = (payload: ReloadUserResponse) => createAction(RECEIVE_USER_RELOAD, payload);
type FetchUserReloadType = ReturnType<typeof RequestUserReload | typeof ReceiveUserReload>;
export const FetchUserReload = (token: string) => {
  return async (dispatch: Dispatch<FetchUserReloadType>) => {
    dispatch(RequestUserReload());
    dispatch(ReceiveUserReload(await reloadUser(token)));
  };
};

export const REQUEST_USER_PREFERENCES = 'REQUEST_USER_PREFERENCES';
export const RECEIVE_USER_PREFERENCES = 'RECEIVE_USER_PREFERENCES';
const RequestUserPreferences = () => createAction(REQUEST_USER_PREFERENCES);
const ReceiveUserPreferences = (payload: GetPreferencesResponse) => createAction(RECEIVE_USER_PREFERENCES, payload);
type FetchUserPreferencesType = ReturnType<typeof RequestUserPreferences | typeof ReceiveUserPreferences>;
export const FetchUserPreferences = (token: string) => {
  return async (dispatch: Dispatch<FetchUserPreferencesType>) => {
    dispatch(RequestUserPreferences());
    dispatch(ReceiveUserPreferences(await getPreferences(token)));
  };
};

export const REQUEST_USER_PREFERENCES_CREATE = 'REQUEST_USER_PREFERENCES_CREATE';
export const RECEIVE_USER_PREFERENCES_CREATE = 'RECEIVE_USER_PREFERENCES_CREATE';
const RequestUserPreferencesCreate = () => createAction(REQUEST_USER_PREFERENCES_CREATE);
const ReceiveUserPreferencesCreate = (
  payload: GetPreferencesResponse
) => createAction(RECEIVE_USER_PREFERENCES_CREATE, payload);
type FetchUserPreferencesCreateType = ReturnType<
  typeof RequestUserPreferencesCreate | typeof ReceiveUserPreferencesCreate
>;
export const FetchUserPreferencesCreate = (token: string, body: CreatePreferencesRequestBody) => {
  return async (dispatch: Dispatch<FetchUserPreferencesCreateType>) => {
    dispatch(RequestUserPreferencesCreate());
    dispatch(ReceiveUserPreferencesCreate(await createPreferences(token, body)));
  };
};

export const REQUEST_REGIONS = 'REQUEST_REGIONS';
export const RECEIVE_REGIONS = 'RECEIVE_REGIONS';
const RequestRegions = () => createAction(REQUEST_REGIONS);
const ReceiveRegions = (payload: Region[] | null) => createAction(RECEIVE_REGIONS, payload);
type FetchRegionsType = ReturnType<typeof RequestRegions | typeof ReceiveRegions>;
export const FetchRegions = () => {
  return async (dispatch: Dispatch<FetchRegionsType>) => {
    dispatch(RequestRegions());
    dispatch(ReceiveRegions(await getRegions()));
  };
};

export const REGION_CHANGE = 'REGION_CHANGE';
export const RegionChange = (payload: Region) => createAction(REGION_CHANGE, payload);

export const REQUEST_REALMS = 'REQUEST_REALMS';
export const RECEIVE_REALMS = 'RECEIVE_REALMS';
const RequestRealms = () => createAction(REQUEST_REALMS);
const ReceiveRealms = (payload: Realm[] | null) => createAction(RECEIVE_REALMS, payload);
type FetchRealmType = ReturnType<typeof RequestRealms | typeof ReceiveRealms>;
export const FetchRealms = (region: Region) => {
  return async (dispatch: Dispatch<FetchRealmType>) => {
    dispatch(RequestRealms());
    dispatch(ReceiveRealms(await getStatus(region.name)));
  };
};

export const REALM_CHANGE = 'REALM_CHANGE';
export const RealmChange = (payload: Realm) => createAction(REALM_CHANGE, payload);

export const CHANGE_IS_LOGIN_DIALOG_OPEN = 'CHANGE_IS_LOGIN_DIALOG_OPEN';
export const ChangeIsLoginDialogOpen = (payload: boolean) => createAction(CHANGE_IS_LOGIN_DIALOG_OPEN, payload);

export const MainActions = {
  RequestPing, ReceivePing,
  UserRegister, UserLogin,
  RequestUserReload, ReceiveUserReload,
  RequestUserPreferences, ReceiveUserPreferences,
  RequestRegions, ReceiveRegions, RegionChange,
  RequestRealms, ReceiveRealms, RealmChange,
  ChangeIsLoginDialogOpen
};

export type MainActions = ActionsUnion<typeof MainActions>;
