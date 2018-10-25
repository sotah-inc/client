import { SortDirection, SortKind } from "@app/api-types";
import { IAuction, IOwner } from "@app/api-types/auction";
import { IItem, IItemsMap } from "@app/api-types/item";

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
    items: IItemsMap;
}

export enum FetchAuctionsLevel {
    initial,
    fetching,
    refetching,
    success,
    failure,
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
    item: IItem | null;
    owner: IOwner | null;
    target: string;
    rank: number;
}

export const defaultAuctionState: IAuctionState = {
    activeSelect: true,
    auctions: [],
    auctionsPerPage: 10,
    currentPage: 0,
    fetchAuctionsLevel: FetchAuctionsLevel.initial,
    items: {},
    queryAuctionResults: [],
    queryAuctionsLevel: QueryAuctionsLevel.initial,
    selectedQueryAuctionResults: [],
    sortDirection: SortDirection.none,
    sortKind: SortKind.none,
    totalResults: 0,
};
