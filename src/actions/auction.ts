import { Dispatch } from 'redux';

import { createAction, ActionsUnion } from './helpers';
import { Region, Realm, OwnerName } from '../types/global';
import { SortChangeOptions } from '../types/auction';
import {
  getAuctions,
  getStatus,
  getRegions,
  GetAuctionsOptions,
  AuctionsResponse,
  GetOwnersOptions,
  OwnersResponse,
  getOwners
} from '../api/data';

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

export const REQUEST_AUCTIONS = 'REQUEST_AUCTIONS';
export const RECEIVE_AUCTIONS = 'RECEIVE_AUCTIONS';
const RequestAuctions = () => createAction(REQUEST_AUCTIONS);
const ReceiveAuctions = (payload: AuctionsResponse | null) => createAction(RECEIVE_AUCTIONS, payload);
type FetchAuctionsType = ReturnType<typeof RequestAuctions | typeof ReceiveAuctions>;
export const FetchAuctions = (opts: GetAuctionsOptions) => {
  return async (dispatch: Dispatch<FetchAuctionsType>) => {
    dispatch(RequestAuctions());
    dispatch(ReceiveAuctions(await getAuctions(opts)));
  };
};

export const PAGE_CHANGE = 'PAGE_CHANGE';
export const PageChange = (payload: number) => createAction(PAGE_CHANGE, payload);

export const COUNT_CHANGE = 'COUNT_CHANGE';
export const CountChange = (payload: number) => createAction(COUNT_CHANGE, payload);

export const SORT_CHANGE = 'SORT_CHANGE';
export const SortChange = (payload: SortChangeOptions) => createAction(SORT_CHANGE, payload);

export const REQUEST_OWNERS = 'REQUEST_OWNERS';
export const RECEIVE_OWNERS = 'RECEIVE_OWNERS';
const RequestOwners = () => createAction(REQUEST_OWNERS);
const ReceiveOwners = (payload: OwnersResponse | null) => createAction(RECEIVE_OWNERS, payload);
type FetchOwnersType = ReturnType<typeof RequestOwners | typeof ReceiveOwners>;
export const FetchOwners = (opts: GetOwnersOptions) => {
  return async (dispatch: Dispatch<FetchOwnersType>) => {
    dispatch(RequestOwners());
    dispatch(ReceiveOwners(await getOwners(opts)));
  };
};

export const OWNER_FILTER_CHANGE = 'OWNER_FILTER_CHANGE';
export const OwnerFilterChange = (payload: OwnerName | null) => createAction(OWNER_FILTER_CHANGE, payload);

export const AuctionActions = {
  RequestRegions, ReceiveRegions,
  RegionChange,
  RequestRealms, ReceiveRealms,
  RealmChange,
  RequestAuctions, ReceiveAuctions,
  PageChange, CountChange, SortChange,
  RequestOwners, ReceiveOwners,
  OwnerFilterChange
};

export type AuctionActions = ActionsUnion<typeof AuctionActions>;
