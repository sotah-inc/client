import { IAuction, IOwner, Item } from "./global";

export interface IAuctionState {
    fetchAuctionsLevel: FetchAuctionsLevel;
    auctions: IAuction[];
    currentPage: number;
    auctionsPerPage: number;
    totalResults: number;
    sortDirection: SortDirection;
    sortKind: SortKind;
    queryAuctionsLevel: QueryAuctionsLevel;
    queryAuctionResults: IQueryAuctionResult[];
    selectedQueryAuctionResults: IQueryAuctionResult[];
    activeSelect: boolean;
}

export enum FetchAuctionsLevel {
    initial,
    fetching,
    refetching,
    success,
    failure,
}

export enum SortDirection {
    none,
    up,
    down,
}

export enum SortKind {
    none,
    item,
    quantity,
    bid,
    buyout,
    buyoutPer,
    auctions,
    owner,
}

export interface ISortChangeOptions {
    sortKind: SortKind;
    sortDirection: SortDirection;
}

export enum FetchOwnersLevel {
    initial,
    fetching,
    refetching,
    success,
    failure,
}

export enum FetchItemsLevel {
    initial,
    fetching,
    refetching,
    success,
    failure,
}

export enum QueryAuctionsLevel {
    initial,
    fetching,
    refetching,
    success,
    failure,
}

export interface IQueryAuctionResult {
    item: Item;
    owner: IOwner;
    target: string;
    rank: number;
}

export const defaultAuctionState: IAuctionState = {
    activeSelect: true,
    auctions: [],
    auctionsPerPage: 10,
    currentPage: 0,
    fetchAuctionsLevel: FetchAuctionsLevel.initial,
    queryAuctionResults: [],
    queryAuctionsLevel: QueryAuctionsLevel.initial,
    selectedQueryAuctionResults: [],
    sortDirection: SortDirection.none,
    sortKind: SortKind.none,
    totalResults: 0,
};
