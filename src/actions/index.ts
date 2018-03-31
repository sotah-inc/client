import { Dispatch } from 'redux';

import {
  REQUEST_REGIONS,
  RECEIVE_REGIONS,
  REQUEST_PING,
  RECEIVE_PING
} from '../constants';
import { Region } from '../types';
import { getRegions, getPing } from '../api';

export type RequestRegionsAction = { type: REQUEST_REGIONS };
export const RequestRegions = (): RequestRegionsAction => { return { type: REQUEST_REGIONS }; };

export type ReceiveRegionsAction = { type: RECEIVE_REGIONS, data: Region[] };
export const ReceiveRegions = (data: Region[]): ReceiveRegionsAction => { return { type: RECEIVE_REGIONS, data }; };

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

export type SotahClientAction = FetchRegionsAction
  | FetchPingAction;
