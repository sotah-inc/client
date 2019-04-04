import { Dispatch } from "redux";

import { OwnerName } from "@app/api-types/auction";
import {
    IGetAuctionsResponse,
    IGetOwnersResponse,
    IQueryAuctionsItem,
    IQueryAuctionsResponse,
} from "@app/api-types/contracts/data";
import { IItem } from "@app/api-types/item";
import {
    getAuctions,
    getOwners,
    IGetAuctionsOptions,
    IGetOwnersOptions,
    IQueryAuctionsOptions,
    queryAuctions,
} from "@app/api/data";
import { ISortChangeOptions } from "@app/types/auction";
import { ActionsUnion, createAction } from "./helpers";

export const REQUEST_AUCTIONS = "REQUEST_AUCTIONS";
export const RECEIVE_AUCTIONS = "RECEIVE_AUCTIONS";
const RequestAuctions = () => createAction(REQUEST_AUCTIONS);
const ReceiveAuctions = (payload: IGetAuctionsResponse | null) => createAction(RECEIVE_AUCTIONS, payload);
type FetchAuctionsType = ReturnType<typeof RequestAuctions | typeof ReceiveAuctions>;
export const FetchAuctions = (opts: IGetAuctionsOptions) => {
    return async (dispatch: Dispatch<FetchAuctionsType>) => {
        dispatch(RequestAuctions());
        dispatch(ReceiveAuctions(await getAuctions(opts)));
    };
};

export const PAGE_CHANGE = "PAGE_CHANGE";
export const PageChange = (payload: number) => createAction(PAGE_CHANGE, payload);

export const COUNT_CHANGE = "COUNT_CHANGE";
export const CountChange = (payload: number) => createAction(COUNT_CHANGE, payload);

export const SORT_CHANGE = "SORT_CHANGE";
export const SortChange = (payload: ISortChangeOptions) => createAction(SORT_CHANGE, payload);

export const REQUEST_OWNERS = "REQUEST_OWNERS";
export const RECEIVE_OWNERS = "RECEIVE_OWNERS";
const RequestOwners = () => createAction(REQUEST_OWNERS);
const ReceiveOwners = (payload: IGetOwnersResponse | null) => createAction(RECEIVE_OWNERS, payload);
type FetchOwnersType = ReturnType<typeof RequestOwners | typeof ReceiveOwners>;
export const FetchOwners = (opts: IGetOwnersOptions) => {
    return async (dispatch: Dispatch<FetchOwnersType>) => {
        dispatch(RequestOwners());
        dispatch(ReceiveOwners(await getOwners(opts)));
    };
};

export const OWNER_FILTER_CHANGE = "OWNER_FILTER_CHANGE";
export const OwnerFilterChange = (payload: OwnerName | null) => createAction(OWNER_FILTER_CHANGE, payload);

export const ITEM_FILTER_CHANGE = "ITEM_FILTER_CHANGE";
export const ItemFilterChange = (item: IItem | null) => createAction(ITEM_FILTER_CHANGE, item);

export const REQUEST_AUCTIONS_QUERY = "REQUEST_AUCTIONS_QUERY";
export const RECEIVE_AUCTIONS_QUERY = "RECEIVE_AUCTIONS_QUERY";
const RequestAuctionsQuery = () => createAction(REQUEST_AUCTIONS_QUERY);
const ReceiveAuctionsQuery = (payload: IQueryAuctionsResponse | null) => createAction(RECEIVE_AUCTIONS_QUERY, payload);
type QueryAuctionsType = ReturnType<typeof RequestAuctionsQuery | typeof ReceiveAuctionsQuery>;
export const FetchAuctionsQuery = (opts: IQueryAuctionsOptions) => {
    return async (dispatch: Dispatch<QueryAuctionsType>) => {
        dispatch(RequestAuctionsQuery());
        dispatch(ReceiveAuctionsQuery(await queryAuctions(opts)));
    };
};

export const REFRESH_AUCTIONS_QUERY = "REFRESH_AUCTIONS_QUERY";
export const RefreshAuctionsQuery = (payload: IQueryAuctionsItem[]) => createAction(REFRESH_AUCTIONS_QUERY, payload);

export const ADD_AUCTIONS_QUERY = "ADD_AUCTIONS_QUERY";
export const AddAuctionsQuery = (payload: IQueryAuctionsItem) => createAction(ADD_AUCTIONS_QUERY, payload);
export const REMOVE_AUCTIONS_QUERY = "REMOVE_AUCTIONS_QUERY";
export const RemoveAuctionsQuery = (payload: number) => createAction(REMOVE_AUCTIONS_QUERY, payload);

export const ACTIVESELECT_CHANGE = "ACTIVESELECT_CHANGE";
export const ActiveSelectChange = (payload: boolean) => createAction(ACTIVESELECT_CHANGE, payload);

export const AuctionActions = {
    ActiveSelectChange,
    AddAuctionsQuery,
    CountChange,
    ItemFilterChange,
    OwnerFilterChange,
    PageChange,
    ReceiveAuctions,
    ReceiveAuctionsQuery,
    ReceiveOwners,
    RefreshAuctionsQuery,
    RemoveAuctionsQuery,
    RequestAuctions,
    RequestAuctionsQuery,
    RequestOwners,
    SortChange,
};

export type AuctionActions = ActionsUnion<typeof AuctionActions>;
