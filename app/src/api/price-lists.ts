import * as HTTPStatus from "http-status";

import { Errors, ItemsMap, RealmSlug, RegionName } from "@app/types/global";
import { Pricelist, PricelistEntry } from "@app/types/price-lists";
import { apiEndpoint } from "./index";

export interface CreatePricelistRequest {
    pricelist: {
        name: string;
        region: RegionName;
        realm: RealmSlug;
    };
    entries: Array<{
        item_id: number;
        quantity_modifier: number;
    }>;
}

export interface CreatePricelistResponse {
    errors: Errors | null;
    data: {
        pricelist: Pricelist;
        entries: PricelistEntry[];
    } | null;
}

export const createPricelist = async (
    token: string,
    request: CreatePricelistRequest,
): Promise<CreatePricelistResponse> => {
    const res = await fetch(`${apiEndpoint}/user/pricelists`, {
        method: "POST",
        body: JSON.stringify(request),
        headers: new Headers({
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        }),
    });
    switch (res.status) {
        case HTTPStatus.CREATED:
            return { errors: null, data: await res.json() };
        case HTTPStatus.UNAUTHORIZED:
            return { errors: { error: "Unauthorized" }, data: null };
        case HTTPStatus.BAD_REQUEST:
        default:
            return { errors: await res.json(), data: null };
    }
};

export interface UpdatePricelistRequest {
    token: string;
    pricelist: Pricelist;
    entries: PricelistEntry[];
}

export interface UpdatePricelistResponse {
    errors: Errors | null;
    data: {
        pricelist: Pricelist;
        entries: PricelistEntry[];
    } | null;
}

export const updatePricelist = async (request: UpdatePricelistRequest): Promise<UpdatePricelistResponse> => {
    const res = await fetch(`${apiEndpoint}/user/pricelists/${request.pricelist.id}`, {
        method: "PUT",
        body: JSON.stringify(request),
        headers: new Headers({
            "content-type": "application/json",
            Authorization: `Bearer ${request.token}`,
        }),
    });
    switch (res.status) {
        case HTTPStatus.OK:
            return { errors: null, data: await res.json() };
        case HTTPStatus.UNAUTHORIZED:
            return { errors: { error: "Unauthorized" }, data: null };
        case HTTPStatus.BAD_REQUEST:
        default:
            return { errors: await res.json(), data: null };
    }
};

export interface GetPricelistsOptions {
    token: string;
    regionName: RegionName;
    realmSlug: RealmSlug;
}

export interface GetPricelistsResponse {
    pricelists: Pricelist[];
    items: ItemsMap;
}

export const getPricelists = async (opts: GetPricelistsOptions): Promise<GetPricelistsResponse> => {
    const res = await fetch(`${apiEndpoint}/user/pricelists/region/${opts.regionName}/realm/${opts.realmSlug}`, {
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
            Authorization: `Bearer ${opts.token}`,
        }),
    });

    return res.json();
};

export interface DeletePricelistRequestOptions {
    token: string;
    id: number;
}

export const deletePricelist = async (opts: DeletePricelistRequestOptions): Promise<number | null> => {
    const res = await fetch(`${apiEndpoint}/user/pricelists/${opts.id}`, {
        method: "DELETE",
        headers: new Headers({
            "content-type": "application/json",
            Authorization: `Bearer ${opts.token}`,
        }),
    });
    switch (res.status) {
        case HTTPStatus.OK:
            return opts.id;
        default:
            return null;
    }
};
