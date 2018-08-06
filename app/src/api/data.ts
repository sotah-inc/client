import * as HTTPStatus from "http-status";

import { IQueryAuctionResult, SortDirection, SortKind } from "../types/auction";
import { IAuction, IOwner, IQueryItemResult, IRealm, IRegion, ItemId, ItemsMap, OwnerName } from "../types/global";
import { apiEndpoint } from "./index";

export const getPing = async (): Promise<boolean> => {
    try {
        await fetch(`${apiEndpoint}/ping`);
        return true;
    } catch (err) {
        return false;
    }
};

export const getRegions = async (): Promise<IRegion[] | null> => {
    const res = await fetch(`${apiEndpoint}/regions`);
    if (res.status !== HTTPStatus.OK) {
        return null;
    }

    return res.json();
};

export const getStatus = async (regionName: string): Promise<IRealm[] | null> => {
    const res = await fetch(`${apiEndpoint}/region/${regionName}/realms`);
    if (res.status !== HTTPStatus.OK) {
        return null;
    }

    return (await res.json()).realms;
};

export interface IGetAuctionsOptions {
    regionName: string;
    realmSlug: string;
    page: number;
    count: number;
    sortDirection: SortDirection;
    sortKind: SortKind;
    ownerFilters: OwnerName[];
    itemFilters: ItemId[];
}

export interface IAuctionsResponse {
    auctions: IAuction[] | null;
    total: number;
}

export const getAuctions = async (opts: IGetAuctionsOptions): Promise<IAuctionsResponse | null> => {
    const { regionName, realmSlug, page, count, sortDirection, sortKind, ownerFilters, itemFilters } = opts;
    const res = await fetch(`${apiEndpoint}/region/${regionName}/realm/${realmSlug}/auctions`, {
        body: JSON.stringify({ page, count, sortDirection, sortKind, ownerFilters, itemFilters }),
        headers: new Headers({ "content-type": "application/json" }),
        method: "POST",
    });
    if (res.status !== HTTPStatus.OK) {
        return null;
    }

    return res.json();
};

export interface IGetOwnersOptions {
    regionName: string;
    realmSlug: string;
    query: string;
}

export interface IOwnersResponse {
    owners: IOwner[];
}

export const getOwners = async (opts: IGetOwnersOptions): Promise<IOwnersResponse | null> => {
    const { regionName, realmSlug, query } = opts;
    const res = await fetch(`${apiEndpoint}/region/${regionName}/realm/${realmSlug}/owners`, {
        body: JSON.stringify({ query }),
        headers: new Headers({ "content-type": "application/json" }),
        method: "POST",
    });
    if (res.status !== HTTPStatus.OK) {
        return null;
    }

    return res.json();
};

export interface ItemsResponse {
    items: IQueryItemResult[];
}

export const getItems = async (query: string): Promise<ItemsResponse | null> => {
    const res = await fetch(`${apiEndpoint}/items`, {
        body: JSON.stringify({ query }),
        headers: new Headers({ "content-type": "application/json" }),
        method: "POST",
    });
    if (res.status !== HTTPStatus.OK) {
        return null;
    }

    return res.json();
};

export interface IQueryAuctionsOptions {
    regionName: string;
    realmSlug: string;
    query: string;
}

export type AuctionsQueryItems = IQueryAuctionResult[];

export interface IAuctionsQueryResponse {
    items: AuctionsQueryItems;
}

export const queryAuctions = async (opts: IQueryAuctionsOptions): Promise<IAuctionsQueryResponse | null> => {
    const { regionName, realmSlug, query } = opts;
    const res = await fetch(`${apiEndpoint}/region/${regionName}/realm/${realmSlug}/query-auctions`, {
        body: JSON.stringify({ query }),
        headers: new Headers({ "content-type": "application/json" }),
        method: "POST",
    });
    if (res.status !== HTTPStatus.OK) {
        return null;
    }

    return res.json();
};

interface IResponseSubItemClass {
    subclass: number;
    name: string;
}

interface IResponseItemClass {
    class: number;
    name: string;
    subclasses: IResponseSubItemClass[];
}

export interface IGetItemClassesResponse {
    classes: IResponseItemClass[] | null;
}

export const getItemClasses = async (): Promise<IGetItemClassesResponse | null> => {
    return (await fetch(`${apiEndpoint}/item-classes`)).json();
};

interface IGetPriceListOptions {
    regionName: string;
    realmSlug: string;
    itemIds: ItemId[];
}

export interface IPriceListMap {
    [key: number]: {
        bid: number;
        buyout: number;
    };
}

interface IGetPriceListResponse {
    price_list: IPriceListMap;
    items: ItemsMap;
}

export const getPriceList = async (opts: IGetPriceListOptions): Promise<IGetPriceListResponse | null> => {
    const { regionName, realmSlug, itemIds } = opts;
    const res = await fetch(`${apiEndpoint}/region/${regionName}/realm/${realmSlug}/price-list`, {
        body: JSON.stringify({ item_ids: itemIds }),
        headers: new Headers({ "content-type": "application/json" }),
        method: "POST",
    });
    if (res.status !== HTTPStatus.OK) {
        return null;
    }

    return res.json();
};
