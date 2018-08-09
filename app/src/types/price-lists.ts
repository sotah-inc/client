import { IUpdatePricelistRequest, IUpdatePricelistResponse } from "@app/api/price-lists";
import { IErrors, ItemId, RealmSlug, RegionName } from "./global";

export interface IPriceListsState {
    pricelists: IPricelist[];
    createPricelistLevel: MutatePricelistLevel;
    createPricelistErrors: IErrors;
    updatePricelistLevel: MutatePricelistLevel;
    updatePricelistErrors: IErrors;
    entryCreateLevel: EntryCreateLevel;
    selectedList: IPricelist | null;
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
export enum ListDialogStep {
    list,
    entry,
    finish,
}
export enum CreateListCompletion {
    initial,
    list,
    entry,
}
export enum ListDialogCompletion {
    initial,
    list,
    entry,
}
export enum EntryCreateLevel {
    initial,
    success,
    failure,
}
export enum MutatePricelistLevel {
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

export interface IPricelist {
    id: number;
    user_id: number;
    name: string;
    region: RegionName;
    realm: RealmSlug;
    pricelist_entries?: IPricelistEntry[];
}

export interface IPricelistEntry {
    id?: number;
    pricelist_id?: number;
    item_id: ItemId;
    quantity_modifier: number;
}

interface IUpdatePricelistMeta {
    isAddEntryDialogOpen?: boolean;
    isEditListDialogOpen?: boolean;
}

export interface IUpdatePricelistRequestOptions {
    request: IUpdatePricelistRequest;
    meta: IUpdatePricelistMeta;
}

export interface IUpdatePricelistResponseOptions {
    response: IUpdatePricelistResponse;
    meta: IUpdatePricelistMeta;
}

export const defaultPriceListsState: IPriceListsState = {
    createPricelistErrors: {},
    createPricelistLevel: MutatePricelistLevel.initial,
    entryCreateLevel: EntryCreateLevel.initial,
    getPricelistsLevel: GetPricelistsLevel.initial,
    isAddEntryDialogOpen: false,
    isAddListDialogOpen: false,
    isDeleteListDialogOpen: false,
    isEditListDialogOpen: false,
    pricelists: [],
    selectedList: null,
    updatePricelistErrors: {},
    updatePricelistLevel: MutatePricelistLevel.initial,
};
