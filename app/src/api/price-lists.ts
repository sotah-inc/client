import * as HTTPStatus from "http-status";

import { IErrors, ItemsMap, ProfessionName, RealmSlug, RegionName } from "@app/types/global";
import { IPricelist, IPricelistEntry } from "@app/types/price-lists";
import { apiEndpoint } from "./index";

export interface ICreatePricelistRequest {
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

export interface ICreatePricelistResponse {
    errors: IErrors | null;
    data: {
        pricelist: IPricelist;
        entries: IPricelistEntry[];
    } | null;
}

export const createPricelist = async (
    token: string,
    request: ICreatePricelistRequest,
): Promise<ICreatePricelistResponse> => {
    const res = await fetch(`${apiEndpoint}/user/pricelists`, {
        body: JSON.stringify(request),
        headers: new Headers({
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        }),
        method: "POST",
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

export interface IUpdatePricelistRequest {
    token: string;
    pricelist: IPricelist;
    entries: IPricelistEntry[];
}

export interface IUpdatePricelistResponse {
    errors: IErrors | null;
    data: {
        pricelist: IPricelist;
        entries: IPricelistEntry[];
    } | null;
}

export const updatePricelist = async (request: IUpdatePricelistRequest): Promise<IUpdatePricelistResponse> => {
    const res = await fetch(`${apiEndpoint}/user/pricelists/${request.pricelist.id}`, {
        body: JSON.stringify(request),
        headers: new Headers({
            Authorization: `Bearer ${request.token}`,
            "content-type": "application/json",
        }),
        method: "PUT",
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

export interface IGetPricelistsOptions {
    token: string;
    regionName: RegionName;
    realmSlug: RealmSlug;
}

export interface IGetPricelistsResponse {
    pricelists: IPricelist[];
    items: ItemsMap;
}

export const getPricelists = async (opts: IGetPricelistsOptions): Promise<IGetPricelistsResponse> => {
    const res = await fetch(`${apiEndpoint}/user/pricelists/region/${opts.regionName}/realm/${opts.realmSlug}`, {
        headers: new Headers({
            Authorization: `Bearer ${opts.token}`,
            "content-type": "application/json",
        }),
        method: "GET",
    });

    return res.json();
};

export interface IDeletePricelistRequestOptions {
    token: string;
    id: number;
}

export const deletePricelist = async (opts: IDeletePricelistRequestOptions): Promise<number | null> => {
    const res = await fetch(`${apiEndpoint}/user/pricelists/${opts.id}`, {
        headers: new Headers({
            Authorization: `Bearer ${opts.token}`,
            "content-type": "application/json",
        }),
        method: "DELETE",
    });
    switch (res.status) {
        case HTTPStatus.OK:
            return opts.id;
        default:
            return null;
    }
};

export interface ICreateProfessionPricelistRequest {
    pricelist: {
        name: string;
        region: RegionName;
        realm: RealmSlug;
    };
    entries: Array<{
        item_id: number;
        quantity_modifier: number;
    }>;
    profession_name: ProfessionName;
}

export interface ICreateProfessionPricelistResponse {
    errors: IErrors | null;
    data: {
        pricelist: IPricelist;
        entries: IPricelistEntry[];
    } | null;
}

export const createProfessionPricelist = async (
    token: string,
    request: ICreateProfessionPricelistRequest,
): Promise<ICreateProfessionPricelistResponse> => {
    const res = await fetch(`${apiEndpoint}/user/profession-pricelists`, {
        body: JSON.stringify(request),
        headers: new Headers({
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        }),
        method: "POST",
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

export interface IDeleteProfessionPricelistRequestOptions {
    token: string;
    id: number;
}

export const deleteProfessionPricelist = async (
    opts: IDeleteProfessionPricelistRequestOptions,
): Promise<number | null> => {
    const res = await fetch(`${apiEndpoint}/user/profession-pricelists/${opts.id}`, {
        headers: new Headers({
            Authorization: `Bearer ${opts.token}`,
            "content-type": "application/json",
        }),
        method: "DELETE",
    });
    switch (res.status) {
        case HTTPStatus.OK:
            return opts.id;
        default:
            return null;
    }
};
