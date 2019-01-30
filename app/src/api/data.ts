import * as HTTPStatus from "http-status";

import {
    IGetAuctionsRequest,
    IGetAuctionsResponse,
    IGetBootResponse,
    IGetOwnersRequest,
    IGetOwnersResponse,
    IGetPostsResponse,
    IGetPricelistHistoriesRequest,
    IGetPricelistHistoriesResponse,
    IGetPricelistRequest,
    IGetPricelistResponse,
    IGetRealmsResponse,
    IQueryAuctionsRequest,
    IQueryAuctionsResponse,
    IQueryItemsRequest,
    IQueryItemsResponse,
    IQueryOwnerItemsRequest,
    IQueryOwnerItemsResponse,
    IStatusRealm,
} from "@app/api-types/contracts/data";
import { IPostJson } from "@app/api-types/entities";
import { ItemId } from "@app/api-types/item";
import { RealmSlug, RegionName } from "@app/api-types/region";
import { apiEndpoint, gather } from "./index";

export const getPing = async (): Promise<boolean> => {
    try {
        await fetch(`${apiEndpoint}/ping`);
        return true;
    } catch (err) {
        return false;
    }
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

export const getStatus = async (regionName: RegionName): Promise<IStatusRealm[] | null> => {
    const { body, status } = await gather<null, IGetRealmsResponse>({
        url: `${apiEndpoint}/region/${regionName}/realms`,
    });
    if (status !== HTTPStatus.OK) {
        return null;
    }

    return body!.realms;
};

export interface IGetAuctionsOptions {
    regionName: string;
    realmSlug: string;
    request: IGetAuctionsRequest;
}

export const getAuctions = async (opts: IGetAuctionsOptions): Promise<IGetAuctionsResponse | null> => {
    const { regionName, realmSlug, request } = opts;
    const { body, status } = await gather<IGetAuctionsRequest, IGetAuctionsResponse>({
        body: request,
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

export interface IGetPostsResult {
    posts: IPostJson[];
    error?: string;
}

export const getPosts = async (): Promise<IGetPostsResult> => {
    const { body, status } = await gather<null, IGetPostsResponse>({
        headers: new Headers({ "content-type": "application/json" }),
        method: "GET",
        url: `${apiEndpoint}/posts`,
    });

    switch (status) {
        case HTTPStatus.OK:
            break;
        default:
            return { posts: [], error: "Failure" };
    }

    return { posts: body!.posts };
};
