import { IUpdatePricelistRequest, IUpdatePricelistResponse } from "@app/api/price-lists";
import { IErrors, IExpansion, IProfession, IProfessionPricelist, ItemId, ItemsMap } from "./global";

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
    items: ItemsMap;
    deletePricelistLevel: DeletePricelistLevel;
    selectedProfession: IProfession | null;
    professionPricelists: IExpansionProfessionPricelistMap;
    getProfessionPricelistsLevel: GetProfessionPricelistsLevel;
    selectedExpansion: IExpansion | null;
    getUnmetDemandLevel: GetUnmetDemandLevel;
    unmetDemandItems: ItemsMap;
    unmetDemandProfessionPricelists: IProfessionPricelist[];
}

export interface IExpansionProfessionPricelistMap {
    [key: string]: IProfessionPricelist[];
}

export enum ListDialogStep {
    list,
    entry,
    finish,
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
export enum GetProfessionPricelistsLevel {
    initial,
    fetching,
    success,
    failure,
}
export enum DeletePricelistLevel {
    initial,
    fetching,
    success,
    failure,
}
export enum GetUnmetDemandLevel {
    initial,
    fetching,
    success,
    failure,
}

export interface IPricelist {
    id: number;
    user_id: number;
    name: string;
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

export interface ISelectExpansionPayload {
    expansion: IExpansion;
    jumpTo?: IPricelist | null;
}

export const defaultPriceListsState: IPriceListsState = {
    createPricelistErrors: {},
    createPricelistLevel: MutatePricelistLevel.initial,
    deletePricelistLevel: DeletePricelistLevel.initial,
    entryCreateLevel: EntryCreateLevel.initial,
    getPricelistsLevel: GetPricelistsLevel.initial,
    getProfessionPricelistsLevel: GetProfessionPricelistsLevel.initial,
    getUnmetDemandLevel: GetUnmetDemandLevel.initial,
    isAddEntryDialogOpen: false,
    isAddListDialogOpen: false,
    isDeleteListDialogOpen: false,
    isEditListDialogOpen: false,
    items: [],
    pricelists: [],
    professionPricelists: {},
    selectedExpansion: null,
    selectedList: null,
    selectedProfession: null,
    unmetDemandItems: {},
    unmetDemandProfessionPricelists: [],
    updatePricelistErrors: {},
    updatePricelistLevel: MutatePricelistLevel.initial,
};
