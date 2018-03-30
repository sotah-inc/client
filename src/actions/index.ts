import { Dispatch } from 'redux';

import { REQUEST_REGIONS, RECEIVE_REGIONS } from '../constants';
import { Region } from '../types';
import { getRegions } from '../api';

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

export type SotahClientAction = FetchRegionsAction;
