import { Dispatch } from 'redux';

import { createAction, ActionsUnion } from './helpers';
import { OwnerName, Item } from '../types/global';
import { SortChangeOptions, QueryAuctionResult } from '../types/auction';
import {
  getAuctions,
  GetAuctionsOptions,
  AuctionsResponse,
  GetOwnersOptions,
  OwnersResponse,
  getOwners,
  QueryAuctionsOptions,
  AuctionsQueryResponse,
  queryAuctions,
  getItemClasses,
  GetItemClassesResponse
} from '../api/data';

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

export const ITEM_FILTER_CHANGE = 'ITEM_FILTER_CHANGE';
export const ItemFilterChange = (item: Item | null) => createAction(ITEM_FILTER_CHANGE, item);

export const REQUEST_AUCTIONS_QUERY = 'REQUEST_AUCTIONS_QUERY';
export const RECEIVE_AUCTIONS_QUERY = 'RECEIVE_AUCTIONS_QUERY';
const RequestAuctionsQuery = () => createAction(REQUEST_AUCTIONS_QUERY);
const ReceiveAuctionsQuery = (payload: AuctionsQueryResponse | null) => createAction(RECEIVE_AUCTIONS_QUERY, payload);
type QueryAuctionsType = ReturnType<typeof RequestAuctionsQuery | typeof ReceiveAuctionsQuery>;
export const FetchAuctionsQuery = (opts: QueryAuctionsOptions) => {
  return async (dispatch: Dispatch<QueryAuctionsType>) => {
    dispatch(RequestAuctionsQuery());
    dispatch(ReceiveAuctionsQuery(await queryAuctions(opts)));
  };
};

export const ADD_AUCTIONS_QUERY = 'ADD_AUCTIONS_QUERY';
export const AddAuctionsQuery = (payload: QueryAuctionResult) => createAction(ADD_AUCTIONS_QUERY, payload);
export const REMOVE_AUCTIONS_QUERY = 'REMOVE_AUCTIONS_QUERY';
export const RemoveAuctionsQuery = (payload: number) => createAction(REMOVE_AUCTIONS_QUERY, payload);

export const REQUEST_ITEMCLASSES = 'REQUEST_ITEMCLASSES';
export const RECEIVE_ITEMCLASSES = 'RECEIVE_ITEMCLASSES';
const RequestItemClasses = () => createAction(REQUEST_ITEMCLASSES);
const ReceiveItemClasses = (payload: GetItemClassesResponse | null) => createAction(RECEIVE_ITEMCLASSES, payload);
type FetchItemClassesType = ReturnType<typeof RequestItemClasses | typeof ReceiveItemClasses>;
export const FetchItemClasses = () => {
  return async (dispatch: Dispatch<FetchItemClassesType>) => {
    dispatch(RequestItemClasses());
    dispatch(ReceiveItemClasses(await getItemClasses()));
  };
};

export const AuctionActions = {
  RequestAuctions, ReceiveAuctions,
  PageChange, CountChange, SortChange,
  RequestOwners, ReceiveOwners,
  OwnerFilterChange,
  ItemFilterChange,
  RequestAuctionsQuery, ReceiveAuctionsQuery,
  AddAuctionsQuery, RemoveAuctionsQuery,
  RequestItemClasses, ReceiveItemClasses
};

export type AuctionActions = ActionsUnion<typeof AuctionActions>;
