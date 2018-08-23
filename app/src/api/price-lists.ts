import * as HTTPStatus from "http-status";

import {
    ExpansionName,
    IErrors,
    IProfessionPricelist,
    ItemsMap,
    ProfessionName,
    RealmSlug,
    RegionName,
} from "@app/types/global";
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
}

export interface IGetPricelistsResponse {
    pricelists: IPricelist[];
    items: ItemsMap;
}

export const getPricelists = async (opts: IGetPricelistsOptions): Promise<IGetPricelistsResponse> => {
    const res = await fetch(`${apiEndpoint}/user/pricelists`, {
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
    expansion_name: ExpansionName;
}

export interface ICreateProfessionPricelistResponse {
    errors: IErrors | null;
    data: {
        pricelist: IPricelist;
        entries: IPricelistEntry[];
        profession_pricelist: IProfessionPricelist;
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

export interface IGetProfessionPricelistsRequestOptions {
    profession: ProfessionName;
}

export interface IGetProfessionPricelistsResponse {
    data: {
        items: ItemsMap;
        profession_pricelists: IProfessionPricelist[];
    } | null;
    errors: IErrors | null;
}

export const getProfessionPricelists = async (
    opts: IGetProfessionPricelistsRequestOptions,
): Promise<IGetProfessionPricelistsResponse> => {
    const res = await fetch(`${apiEndpoint}/profession-pricelists/${opts.profession}`, {
        headers: new Headers({ "content-type": "application/json" }),
        method: "GET",
    });
    switch (res.status) {
        case HTTPStatus.OK:
            return { errors: null, data: await res.json() };
        default:
            return { data: null, errors: { failure: "Failed to fetch profession-pricelists" } };
    }
};

export interface IGetUnmetDemandRequestOptions {
    region: RegionName;
    realm: RealmSlug;
    expansion: ExpansionName;
}

export interface IGetUnmetDemandResponse {
    data: {
        items: ItemsMap;
        professionPricelists: IProfessionPricelist[];
    } | null;
    errors: IErrors | null;
}

export const getUnmetDemand = async (opts: IGetUnmetDemandRequestOptions): Promise<IGetUnmetDemandResponse | null> => {
    const res = await fetch(`${apiEndpoint}/region/${opts.region}/realm/${opts.realm}/unmet-demand`, {
        body: JSON.stringify({ expansion: opts.expansion }),
        headers: new Headers({ "content-type": "application/json" }),
        method: "POST",
    });
    switch (res.status) {
        case HTTPStatus.OK:
            return { errors: null, data: await res.json() };
        default:
            return { data: null, errors: { failure: "Failed to fetch unmet-demand" } };
    }
};
