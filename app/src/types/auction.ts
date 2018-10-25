import { SortDirection, SortKind } from "@app/api-types";
import { IAuction } from "@app/api-types/auction";
import { IQueryAuctionsItem } from "@app/api-types/contracts/data";
import { IItemsMap } from "@app/api-types/item";
import { FetchLevel } from "@app/types/main";

export interface IAuctionState {
    fetchAuctionsLevel: FetchLevel;
    auctions: IAuction[];
    currentPage: number;
    auctionsPerPage: number;
    totalResults: number;
    sortDirection: SortDirection;
    sortKind: SortKind;
    queryAuctionsLevel: FetchLevel;
    queryAuctionResults: IQueryAuctionsItem[];
    selectedQueryAuctionResults: IQueryAuctionsItem[];
    activeSelect: boolean;
    items: IItemsMap;
}

export interface ISortChangeOptions {
    sortKind: SortKind;
    sortDirection: SortDirection;
}

export const defaultAuctionState: IAuctionState = {
    activeSelect: true,
    auctions: [],
    auctionsPerPage: 10,
    currentPage: 0,
    fetchAuctionsLevel: FetchLevel.initial,
    items: {},
    queryAuctionResults: [],
    queryAuctionsLevel: FetchLevel.initial,
    selectedQueryAuctionResults: [],
    sortDirection: SortDirection.none,
    sortKind: SortKind.none,
    totalResults: 0,
};
