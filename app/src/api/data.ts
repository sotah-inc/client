import * as HTTPStatus from "http-status";

import {
    IGetAuctionsRequest,
    IGetAuctionsResponse,
    IGetBootResponse,
    IGetOwnersRequest,
    IGetOwnersResponse,
    IGetPricelistHistoriesRequest,
    IGetPricelistHistoriesResponse,
    IGetPricelistRequest,
    IGetPricelistResponse,
    IGetRealmsResponse,
    IGetRegionsResponse,
    IQueryAuctionsRequest,
    IQueryAuctionsResponse,
    IQueryItemsRequest,
    IQueryItemsResponse,
    IQueryOwnerItemsRequest,
    IQueryOwnerItemsResponse,
    IStatusRealm,
} from "../api-types/contracts/data";
import { SortDirection, SortKind } from "../types/auction";
import { ItemId, OwnerName, RealmSlug, RegionName } from "../types/global";
import { apiEndpoint, gather } from "./index";

export const getPing = async (): Promise<boolean> => {
    try {
        await fetch(`${apiEndpoint}/ping`);
        return true;
    } catch (err) {
        return false;
    }
};

export const getRegions = async (): Promise<IGetRegionsResponse | null> => {
    const { body, status } = await gather<null, IGetRegionsResponse>({ url: `${apiEndpoint}/regions` });
    if (status !== HTTPStatus.OK) {
        return null;
    }

    return body;
};

export const getBoot = async (): Promise<IGetBootResponse | null> => {
    const { body, status } = await gather<null, IGetBootResponse>({
        url: `${apiEndpoint}/boot`,
    });
    if (status !== HTTPStatus.OK) {
        return null;
    }

    return body;
};

export const getStatus = async (regionName: string): Promise<IStatusRealm[] | null> => {
    const { body, status } = await gather<null, IGetRealmsResponse>({
        url: `${apiEndpoint}/region/${regionName}/realms`,
    });
    if (status !== HTTPStatus.OK) {
        return null;
    }

    return body.realms;
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

export const getAuctions = async (opts: IGetAuctionsOptions): Promise<IGetAuctionsResponse | null> => {
    const { regionName, realmSlug, page, count, sortDirection, sortKind, ownerFilters, itemFilters } = opts;
    const { body, status } = await gather<IGetAuctionsRequest, IGetAuctionsResponse>({
        body: { page, count, sortDirection, sortKind, ownerFilters, itemFilters },
        method: "POST",
        url: `${apiEndpoint}/region/${regionName}/realm/${realmSlug}/auctions`,
    });
    if (status !== HTTPStatus.OK) {
        return null;
    }

    return body;
};

export interface IGetOwnersOptions {
    regionName: string;
    realmSlug: string;
    query: string;
}

export const getOwners = async (opts: IGetOwnersOptions): Promise<IGetOwnersResponse | null> => {
    const { regionName, realmSlug, query } = opts;
    const { body, status } = await gather<IGetOwnersRequest, IGetOwnersResponse>({
        body: { query },
        method: "POST",
        url: `${apiEndpoint}/region/${regionName}/realm/${realmSlug}/owners`,
    });
    if (status !== HTTPStatus.OK) {
        return null;
    }

    return body;
};

export const getItems = async (query: string): Promise<IQueryItemsResponse | null> => {
    const { body, status } = await gather<IQueryItemsRequest, IQueryItemsResponse>({
        body: { query },
        method: "POST",
        url: `${apiEndpoint}/items`,
    });
    if (status !== HTTPStatus.OK) {
        return null;
    }

    return body;
};

export interface IQueryAuctionsOptions {
    regionName: string;
    realmSlug: string;
    query: string;
}

export const queryAuctions = async (opts: IQueryAuctionsOptions): Promise<IQueryAuctionsResponse | null> => {
    const { regionName, realmSlug, query } = opts;
    const { body, status } = await gather<IQueryAuctionsRequest, IQueryAuctionsResponse>({
        body: { query },
        method: "POST",
        url: `${apiEndpoint}/region/${regionName}/realm/${realmSlug}/query-auctions`,
    });
    if (status !== HTTPStatus.OK) {
        return null;
    }

    return body;
};

export interface IGetPriceListOptions {
    regionName: string;
    realmSlug: string;
    itemIds: ItemId[];
}

export const getPriceList = async (opts: IGetPriceListOptions): Promise<IGetPricelistResponse | null> => {
    const { regionName, realmSlug, itemIds } = opts;
    const { body, status } = await gather<IGetPricelistRequest, IGetPricelistResponse>({
        body: { item_ids: itemIds },
        method: "POST",
        url: `${apiEndpoint}/region/${regionName}/realm/${realmSlug}/price-list`,
    });
    if (status !== HTTPStatus.OK) {
        return null;
    }

    return body;
};

export interface IGetPriceListHistoryOptions extends IGetPriceListOptions {
    regionName: string;
    realmSlug: string;
    itemIds: ItemId[];
}

export const getPriceListHistory = async (
    opts: IGetPriceListHistoryOptions,
): Promise<IGetPricelistHistoriesResponse | null> => {
    const { regionName, realmSlug, itemIds } = opts;
    const { body, status } = await gather<IGetPricelistHistoriesRequest, IGetPricelistHistoriesResponse>({
        body: { item_ids: itemIds },
        method: "POST",
        url: `${apiEndpoint}/region/${regionName}/realm/${realmSlug}/price-list-history`,
    });
    if (status !== HTTPStatus.OK) {
        return null;
    }

    return body;
};

export interface IQueryOwnersByItemsOptions {
    regionName: RegionName;
    realmSlug: RealmSlug;
    items: ItemId[];
}

export const queryOwnersByItems = async (
    opts: IQueryOwnersByItemsOptions,
): Promise<IQueryOwnerItemsResponse | null> => {
    const { regionName, realmSlug, items } = opts;
    const { body, status } = await gather<IQueryOwnerItemsRequest, IQueryOwnerItemsResponse>({
        body: { items },
        method: "POST",
        url: `${apiEndpoint}/region/${regionName}/realm/${realmSlug}/query-owner-items`,
    });
    if (status !== HTTPStatus.OK) {
        return null;
    }

    return body;
};
