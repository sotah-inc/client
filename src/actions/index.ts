import { Dispatch } from 'redux';

import { createAction, ActionsUnion } from './helpers';
import { Region, Realm, User } from '../types';
import { getPing, getStatus, getRegions } from '../api';

export const sleep = (duration: number): Promise<void> =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), duration));

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

export const REGION_CHANGE = 'REGION_CHANGE';
export const RegionChange = (payload: Region) => createAction(REGION_CHANGE, payload);

export const REALM_CHANGE = 'REALM_CHANGE';
export const RealmChange = (payload: Realm) => createAction(REALM_CHANGE, payload);

export const USER_REGISTER = 'USER_REGISTER';
export const UserRegister = (payload: User) => createAction(USER_REGISTER, payload);

export const Actions = {
  RequestRegions, ReceiveRegions,
  RequestPing, ReceivePing,
  RequestRealms, ReceiveRealms,
  RegionChange,
  RealmChange,
  UserRegister
};

export type Actions = ActionsUnion<typeof Actions>;
