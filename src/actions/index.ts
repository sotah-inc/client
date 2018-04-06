import { Dispatch } from 'redux';

import { createAction, ActionsUnion } from './helpers';
import { Region, Realm } from '../types';
import { getStatus, getRegions, getPing } from '../api';

export const REQUEST_REGIONS = 'REQUEST_REGIONS';
export const RECEIVE_REGIONS = 'RECEIVE_REGIONS';
const RequestRegions = () => createAction(REQUEST_REGIONS);
const ReceiveRegions = (payload: Region[] | null) => createAction(RECEIVE_REGIONS, payload);
type FetchRegionsType = ReturnType<typeof RequestRegions | typeof ReceiveRegions>;
export const FetchRegions = () => {
  return (dispatch: Dispatch<FetchRegionsType>) => {
    dispatch(RequestRegions());
    return getRegions().then((res) => dispatch(ReceiveRegions(res)));
  };
};

export const REQUEST_PING = 'REQUEST_PING';
export const RECEIVE_PING = 'RECEIVE_PING';
const RequestPing = () => createAction(REQUEST_PING);
const ReceivePing = (payload: boolean) => createAction(RECEIVE_PING, payload);
type FetchPingType = ReturnType<typeof RequestPing | typeof ReceivePing>;
export const FetchPing = () => {
  return (dispatch: Dispatch<FetchPingType>) => {
    dispatch(RequestPing());
    return getPing().then((res) => dispatch(ReceivePing(res)));
  };
};

export const REQUEST_REALMS = 'REQUEST_REALMS';
export const RECEIVE_REALMS = 'RECEIVE_REALMS';
const RequestRealms = () => createAction(REQUEST_REALMS);
const ReceiveRealms = (payload: Realm[] | null) => createAction(RECEIVE_REALMS, payload);
type FetchRealmType = ReturnType<typeof RequestRealms | typeof ReceiveRealms>;
export const FetchRealms = (region: Region) => {
  return (dispatch: Dispatch<FetchRealmType>) => {
    dispatch(RequestRealms());
    return getStatus(region.name).then((res) => dispatch(ReceiveRealms(res)));
  };
};

export const REGION_CHANGE = 'REGION_CHANGE';
export const RegionChange = (payload: Region) => createAction(REGION_CHANGE, payload);

export const REALM_CHANGE = 'REALM_CHANGE';
export const RealmChange = (payload: Realm) => createAction(REALM_CHANGE, payload);

export const Actions = {
  RequestRegions, ReceiveRegions,
  RequestPing, ReceivePing,
  RequestRealms, ReceiveRealms,
  RegionChange,
  RealmChange
};

export type Actions = ActionsUnion<typeof Actions>;
