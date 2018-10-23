import { ProfessionPricelist } from "../../entities/profession-pricelist";
import { SortDirection, SortKind } from "../../types";
import { IAuction, IOwner, OwnerName } from "../../types/auction";
import { ExpansionName, IExpansion } from "../../types/expansion";
import { IItem, IItemsMap, ItemId } from "../../types/item";
import { IItemClass } from "../../types/item-class";
import {
    IItemMarketPrices,
    IItemPriceLimits,
    IPriceLimits,
    IPricelistHistoryMap,
    IPriceListMap,
} from "../../types/pricelist";
import { IProfession } from "../../types/profession";
import { IRealm, IRegion, realmSlug, regionName } from "../../types/region";

export type IGetRegionsResponse = IRegion[];

export interface IGetItemsClassesResponse {
    classes: IItemClass[];
}

export interface IGetBootResponse {
    regions: IRegion[];
    item_classes: IItemClass[];
    expansions: IExpansion[];
    professions: IProfession[];
}

interface IStatusRealm extends IRealm {
    regionName: string;
}

export interface IGetRealmsResponse {
    realms: IStatusRealm[];
}

export interface IGetAuctionsRequest {
    count: number;
    page: number;
    sortKind: SortKind;
    sortDirection: SortDirection;
    ownerFilters: OwnerName[];
    itemFilters: ItemId[];
}

export interface IGetAuctionsResponse {
    auctions: IAuction[];
    total: number;
    total_count: number;
    items: IItemsMap;
}

export interface IGetOwnersRequest {
    query: string;
}

export interface IGetOwnersResponse {
    owners: OwnerName[];
}

export interface IQueryAuctionsRequest {
    query: string;
}

export interface IQueryAuctionsItem {
    target: string;
    item: IItem | null;
    owner: IOwner | null;
    rank: number;
}

export interface IQueryAuctionsResponse {
    items: IQueryAuctionsItem[];
}

export interface IQueryOwnerItemsRequest {
    region_name: regionName;
    realm_slug: realmSlug;
    items: ItemId[];
}

export interface IQueryOwnerItemsResponse {
    total_value: number;
    total_volume: number;
    ownership: {
        [ownerName: string]: {
            owned_value: number;
            owned_volume: number;
        };
    };
}

export interface IQueryItemsRequest {
    query: string;
}

export interface IQueryItemsResponse {
    items: Array<{
        item: IItem;
        target: string;
        rank: number;
    }>;
}

export interface IGetPricelistRequest {
    region_name: regionName;
    realm_slug: realmSlug;
    item_ids: ItemId[];
}

export interface IGetPricelistResponse {
    price_list: IPriceListMap;
}

export interface IGetPricelistHistoriesRequest {
    region_name: regionName;
    realm_slug: realmSlug;
    item_ids: ItemId[];
    lower_bounds: number;
    upper_bounds: number;
}

export interface IGetPricelistHistoriesResponse {
    history: {
        [itemId: number]: IPricelistHistoryMap;
    };
    items: IItemsMap;
    itemPriceLimits: IItemPriceLimits;
    overallPriceLimits: IPriceLimits;
    itemMarketPrices: IItemMarketPrices;
}

export interface IGetUnmetDemandRequest {
    expansion: ExpansionName;
}

export interface IGetUnmetDemandResponse {
    items: IItemsMap;
    professionPricelists: ProfessionPricelist[];
    unmetItemIds: ItemId[];
}

export interface IGetProfessionPricelistsResponse {
    profession_pricelists: ProfessionPricelist[];
    items: IItemsMap;
}
