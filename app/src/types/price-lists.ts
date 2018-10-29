import { IQueryOwnerItemsMap } from "@app/api-types/contracts/data";
import { IUpdatePricelistRequest } from "@app/api-types/contracts/user/pricelist-crud";
import { IPricelistJson, IProfessionPricelistJson } from "@app/api-types/entities";
import { IExpansion } from "@app/api-types/expansion";
import { IItemsMap, ItemId } from "@app/api-types/item";
import {
    IItemMarketPrices,
    IItemPriceLimits,
    IPriceLimits,
    IPricelistHistoryMap,
    IPriceListMap,
} from "@app/api-types/pricelist";
import { IProfession } from "@app/api-types/profession";
import { IUpdatePricelistResult } from "@app/api/price-lists";
import { IErrors } from "./global";
import { FetchLevel } from "./main";

export interface IPriceListsState {
    pricelists: IPricelistJson[];
    createPricelistLevel: FetchLevel;
    createPricelistErrors: IErrors;
    updatePricelistLevel: FetchLevel;
    updatePricelistErrors: IErrors;
    entryCreateLevel: FetchLevel;
    selectedList: IPricelistJson | null;
    isAddListDialogOpen: boolean;
    isEditListDialogOpen: boolean;
    isDeleteListDialogOpen: boolean;
    isAddEntryDialogOpen: boolean;
    getPricelistsLevel: FetchLevel;
    items: IItemsMap;
    deletePricelistLevel: FetchLevel;
    selectedProfession: IProfession | null;
    professionPricelists: IExpansionProfessionPricelistMap;
    getProfessionPricelistsLevel: FetchLevel;
    selectedExpansion: IExpansion | null;
    getUnmetDemandLevel: FetchLevel;
    unmetDemandItemIds: ItemId[];
    unmetDemandProfessionPricelists: IProfessionPricelistJson[];
    getPricelistLevel: FetchLevel;
    pricelistMap: IPriceListMap;
    getPricelistHistoryLevel: FetchLevel;
    pricelistHistoryMap: IPricelistHistoryMap;
    getItemsOwnershipLevel: FetchLevel;
    itemsOwnershipMap: IQueryOwnerItemsMap;
    itemsPriceLimits: IItemPriceLimits;
    overallPriceLimits: IPriceLimits;
    itemsMarketPrices: IItemMarketPrices;
}

export interface IExpansionProfessionPricelistMap {
    [key: string]: IProfessionPricelistJson[];
}

export enum ListDialogStep {
    list,
    entry,
    finish,
}

interface IUpdatePricelistMeta {
    isAddEntryDialogOpen?: boolean;
    isEditListDialogOpen?: boolean;
}

export interface IUpdatePricelistRequestOptions {
    request: IUpdatePricelistRequest;
    meta: IUpdatePricelistMeta;
    token: string;
    id: number;
}

export interface IUpdatePricelistResponseOptions {
    result: IUpdatePricelistResult;
    meta: IUpdatePricelistMeta;
}

export interface ISelectExpansionPayload {
    expansion: IExpansion;
    jumpTo?: IPricelistJson | null;
}

export const defaultPriceListsState: IPriceListsState = {
    createPricelistErrors: {},
    createPricelistLevel: FetchLevel.initial,
    deletePricelistLevel: FetchLevel.initial,
    entryCreateLevel: FetchLevel.initial,
    getItemsOwnershipLevel: FetchLevel.initial,
    getPricelistHistoryLevel: FetchLevel.initial,
    getPricelistLevel: FetchLevel.initial,
    getPricelistsLevel: FetchLevel.initial,
    getProfessionPricelistsLevel: FetchLevel.initial,
    getUnmetDemandLevel: FetchLevel.initial,
    isAddEntryDialogOpen: false,
    isAddListDialogOpen: false,
    isDeleteListDialogOpen: false,
    isEditListDialogOpen: false,
    items: [],
    itemsMarketPrices: {},
    itemsOwnershipMap: {},
    itemsPriceLimits: {},
    overallPriceLimits: { lower: 0, upper: 0 },
    pricelistHistoryMap: {},
    pricelistMap: {},
    pricelists: [],
    professionPricelists: {},
    selectedExpansion: null,
    selectedList: null,
    selectedProfession: null,
    unmetDemandItemIds: [],
    unmetDemandProfessionPricelists: [],
    updatePricelistErrors: {},
    updatePricelistLevel: FetchLevel.initial,
};
