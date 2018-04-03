import { Dispatch } from 'redux';

import {
  REQUEST_REGIONS,
  RECEIVE_REGIONS,
  REQUEST_PING,
  RECEIVE_PING,
  REQUEST_REALMS,
  RECEIVE_REALMS,
  REGION_CHANGE,
  REALM_CHANGE
} from '../constants';
import { Region, Realm } from '../types';
import { getStatus, getRegions, getPing } from '../api';

export type RequestRegionsAction = { type: REQUEST_REGIONS };
export const RequestRegions = (): RequestRegionsAction => { return { type: REQUEST_REGIONS }; };

export type ReceiveRegionsAction = { type: RECEIVE_REGIONS, data: Region[] | null };
export const ReceiveRegions = (data: Region[] | null): ReceiveRegionsAction => {
  return { type: RECEIVE_REGIONS, data };
};

export type FetchRegionsAction = RequestRegionsAction | ReceiveRegionsAction;
export const FetchRegions = () => {
  return (dispatch: Dispatch<FetchRegionsAction>) => {
    dispatch(RequestRegions());
    return getRegions().then((res) => dispatch(ReceiveRegions(res)));
  };
};

export type RequestPingAction = { type: REQUEST_PING };
export const RequestPing = (): RequestPingAction => { return { type: REQUEST_PING }; };

export type ReceivePingAction = { type: RECEIVE_PING, data: boolean };
export const ReceivePing = (data: boolean): ReceivePingAction => { return { type: RECEIVE_PING, data }; };

export type FetchPingAction = RequestPingAction | ReceivePingAction;
export const FetchPing = () => {
  return (dispatch: Dispatch<FetchPingAction>) => {
    dispatch(RequestPing());
    return getPing().then((res) => dispatch(ReceivePing(res)));
  };
};

export type RequestRealmsAction = { type: REQUEST_REALMS };
export const RequestRealms = (): RequestRealmsAction => { return { type: REQUEST_REALMS }; };

export type ReceiveRealmsAction = { type: RECEIVE_REALMS, data: Realm[] | null };
export const ReceiveRealms = (data: Realm[] | null): ReceiveRealmsAction => { return { type: RECEIVE_REALMS, data }; };

export type FetchRealmsAction = RequestRealmsAction | ReceiveRealmsAction;
export const FetchRealms = (region: Region) => {
  return (dispatch: Dispatch<FetchPingAction>) => {
    dispatch(RequestRealms());
    try {
      return getStatus(region.name).then((res) => dispatch(ReceiveRealms(res)));
    } catch (err) {
      dispatch(ReceiveRealms(null));

      return;
    }
  };
};

export type RegionChangeAction = { type: REGION_CHANGE, region: Region };
export const RegionChange = (region: Region) => {
  return { type: REGION_CHANGE, region };
};

export type RealmChangeAction = { type: REALM_CHANGE, realm: Realm };
export const RealmChange = (realm: Realm) => {
  return { type: REALM_CHANGE, realm };
};

export type SotahClientAction = FetchRegionsAction
  | FetchPingAction
  | FetchRealmsAction
  | RegionChangeAction
  | RealmChangeAction;
