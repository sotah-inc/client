import { UpdatePricelistRequest, UpdatePricelistResponse } from "@app/api/price-lists";
import { Errors, ItemId, RealmSlug, RegionName } from "./global";

export interface PriceListsState {
    pricelists: Pricelist[];
    createPricelistLevel: CreatePricelistLevel;
    createPricelistErrors: Errors;
    updatePricelistLevel: UpdatePricelistLevel;
    updatePricelistErrors: Errors;
    entryCreateLevel: EntryCreateLevel;
    selectedList: Pricelist | null;
    isAddListDialogOpen: boolean;
    isEditListDialogOpen: boolean;
    isDeleteListDialogOpen: boolean;
    isAddEntryDialogOpen: boolean;
    getPricelistsLevel: GetPricelistsLevel;
}

export enum CreateListStep {
    list,
    entry,
    finish,
}
export enum CreateListCompletion {
    initial,
    list,
    entry,
}
export enum EntryCreateLevel {
    initial,
    success,
    failure,
}
export enum CreatePricelistLevel {
    initial,
    fetching,
    success,
    failure,
}
export enum UpdatePricelistLevel {
    initial,
    fetching,
    success,
    failure,
}
export enum GetPriceListLevel {
    initial,
    success,
    failure,
}
export enum GetPricelistsLevel {
    initial,
    fetching,
    success,
    failure,
}

export interface Pricelist {
    id: number;
    user_id: number;
    name: string;
    region: RegionName;
    realm: RealmSlug;
    pricelist_entries?: PricelistEntry[];
}

export interface PricelistEntry {
    id?: number;
    pricelist_id?: number;
    item_id: ItemId;
    quantity_modifier: number;
}

interface UpdatePricelistMeta {
    isAddEntryDialogOpen?: boolean;
    isEditListDialogOpen?: boolean;
}

export interface UpdatePricelistRequestOptions {
    request: UpdatePricelistRequest;
    meta: UpdatePricelistMeta;
}

export interface UpdatePricelistResponseOptions {
    response: UpdatePricelistResponse;
    meta: UpdatePricelistMeta;
}

export const defaultPriceListsState: PriceListsState = {
    pricelists: [],
    createPricelistLevel: CreatePricelistLevel.initial,
    createPricelistErrors: {},
    updatePricelistLevel: UpdatePricelistLevel.initial,
    updatePricelistErrors: {},
    entryCreateLevel: EntryCreateLevel.initial,
    selectedList: null,
    isAddListDialogOpen: false,
    isEditListDialogOpen: false,
    isDeleteListDialogOpen: false,
    isAddEntryDialogOpen: false,
    getPricelistsLevel: GetPricelistsLevel.initial,
};
