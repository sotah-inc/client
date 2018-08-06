import * as HTTPStatus from "http-status";

import { QueryAuctionResult, SortDirection, SortKind } from "../types/auction";
import { Auction, ItemId, ItemsMap, Owner, OwnerName, QueryItemResult, Realm, Region } from "../types/global";
import { apiEndpoint } from "./index";

export const getPing = async (): Promise<boolean> => {
    try {
        await fetch(`${apiEndpoint}/ping`);
        return true;
    } catch (err) {
        return false;
    }
};

export const getRegions = async (): Promise<Region[] | null> => {
    const res = await fetch(`${apiEndpoint}/regions`);
    if (res.status !== HTTPStatus.OK) {
        return null;
    }

    return res.json();
};

export const getStatus = async (regionName: string): Promise<Realm[] | null> => {
    const res = await fetch(`${apiEndpoint}/region/${regionName}/realms`);
    if (res.status !== HTTPStatus.OK) {
        return null;
    }

    return (await res.json()).realms;
};

export interface GetAuctionsOptions {
    regionName: string;
    realmSlug: string;
    page: number;
    count: number;
    sortDirection: SortDirection;
    sortKind: SortKind;
    ownerFilters: OwnerName[];
    itemFilters: ItemId[];
}

export interface AuctionsResponse {
    auctions: Auction[] | null;
    total: number;
}

export const getAuctions = async (opts: GetAuctionsOptions): Promise<AuctionsResponse | null> => {
    const { regionName, realmSlug, page, count, sortDirection, sortKind, ownerFilters, itemFilters } = opts;
    const res = await fetch(`${apiEndpoint}/region/${regionName}/realm/${realmSlug}/auctions`, {
        method: "POST",
        body: JSON.stringify({ page, count, sortDirection, sortKind, ownerFilters, itemFilters }),
        headers: new Headers({ "content-type": "application/json" }),
    });
    if (res.status !== HTTPStatus.OK) {
        return null;
    }

    return res.json();
};

export interface GetOwnersOptions {
    regionName: string;
    realmSlug: string;
    query: string;
}

export interface OwnersResponse {
    owners: Owner[];
}

export const getOwners = async (opts: GetOwnersOptions): Promise<OwnersResponse | null> => {
    const { regionName, realmSlug, query } = opts;
    const res = await fetch(`${apiEndpoint}/region/${regionName}/realm/${realmSlug}/owners`, {
        method: "POST",
        body: JSON.stringify({ query }),
        headers: new Headers({ "content-type": "application/json" }),
    });
    if (res.status !== HTTPStatus.OK) {
        return null;
    }

    return res.json();
};

export interface ItemsResponse {
    items: QueryItemResult[];
}

export const getItems = async (query: string): Promise<ItemsResponse | null> => {
    const res = await fetch(`${apiEndpoint}/items`, {
        method: "POST",
        body: JSON.stringify({ query }),
        headers: new Headers({ "content-type": "application/json" }),
    });
    if (res.status !== HTTPStatus.OK) {
        return null;
    }

    return res.json();
};

export interface QueryAuctionsOptions {
    regionName: string;
    realmSlug: string;
    query: string;
}

export type AuctionsQueryItems = QueryAuctionResult[];

export interface AuctionsQueryResponse {
    items: AuctionsQueryItems;
}

export const queryAuctions = async (opts: QueryAuctionsOptions): Promise<AuctionsQueryResponse | null> => {
    const { regionName, realmSlug, query } = opts;
    const res = await fetch(`${apiEndpoint}/region/${regionName}/realm/${realmSlug}/query-auctions`, {
        method: "POST",
        body: JSON.stringify({ query }),
        headers: new Headers({ "content-type": "application/json" }),
    });
    if (res.status !== HTTPStatus.OK) {
        return null;
    }

    return res.json();
};

export interface ResponseSubItemClass {
    subclass: number;
    name: string;
}

export interface ResponseItemClass {
    class: number;
    name: string;
    subclasses: ResponseSubItemClass[];
}

export interface GetItemClassesResponse {
    classes: ResponseItemClass[] | null;
}

export const getItemClasses = async (): Promise<GetItemClassesResponse | null> => {
    return (await fetch(`${apiEndpoint}/item-classes`)).json();
};

export interface GetPriceListOptions {
    regionName: string;
    realmSlug: string;
    itemIds: ItemId[];
}

export interface PriceListMap {
    [key: number]: {
        bid: number;
        buyout: number;
    };
}

export interface GetPriceListResponse {
    price_list: PriceListMap;
    items: ItemsMap;
}

export const getPriceList = async (opts: GetPriceListOptions): Promise<GetPriceListResponse | null> => {
    const { regionName, realmSlug, itemIds } = opts;
    const res = await fetch(`${apiEndpoint}/region/${regionName}/realm/${realmSlug}/price-list`, {
        method: "POST",
        body: JSON.stringify({ item_ids: itemIds }),
        headers: new Headers({ "content-type": "application/json" }),
    });
    if (res.status !== HTTPStatus.OK) {
        return null;
    }

    return res.json();
};
