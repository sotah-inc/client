import { Dispatch } from "redux";

import {
    IGetPricelistHistoriesResponse,
    IGetPricelistResponse,
    IQueryOwnerItemsResponse,
} from "@app/api-types/contracts/data";
import { ICreatePricelistRequest, IGetPricelistsResponse } from "@app/api-types/contracts/user/pricelist-crud";
import { ICreateProfessionPricelistRequest } from "@app/api-types/contracts/user/profession-pricelists-crud";
import { IPricelistJson } from "@app/api-types/entities";
import { IExpansion } from "@app/api-types/expansion";
import { IItemsMap } from "@app/api-types/item";
import { IProfession, ProfessionName } from "@app/api-types/profession";
import {
    getPriceList,
    getPriceListHistory,
    IGetPriceListHistoryOptions,
    IGetPriceListOptions,
    IQueryOwnersByItemsOptions,
    queryOwnersByItems,
} from "@app/api/data";
import {
    createPricelist,
    createProfessionPricelist,
    deletePricelist,
    deleteProfessionPricelist,
    getPricelists,
    getProfessionPricelists,
    getUnmetDemand,
    ICreatePricelistResult,
    ICreateProfessionPricelistResult,
    IGetProfessionPricelistsResult,
    IGetUnmetDemandOptions,
    IGetUnmetDemandResult,
    updatePricelist,
} from "@app/api/price-lists";
import { FetchLevel } from "@app/types/main";
import {
    ISelectExpansionPayload,
    IUpdatePricelistRequestOptions,
    IUpdatePricelistResponseOptions,
} from "@app/types/price-lists";

import { ActionsUnion, createAction } from "./helpers";

export const REQUEST_CREATE_PRICELIST = "REQUEST_CREATE_PRICELIST";
export const RequestCreatePricelist = () => createAction(REQUEST_CREATE_PRICELIST);
export const RECEIVE_CREATE_PRICELIST = "RECEIVE_CREATE_PRICELIST";
export const ReceiveCreatePricelist = (payload: ICreatePricelistResult) =>
    createAction(RECEIVE_CREATE_PRICELIST, payload);
type FetchCreatePricelistType = ReturnType<typeof RequestCreatePricelist | typeof ReceiveCreatePricelist>;
export const FetchCreatePricelist = (token: string, request: ICreatePricelistRequest) => {
    return async (dispatch: Dispatch<FetchCreatePricelistType>) => {
        dispatch(RequestCreatePricelist());
        dispatch(ReceiveCreatePricelist(await createPricelist(token, request)));
    };
};

export const REQUEST_UPDATE_PRICELIST = "REQUEST_UPDATE_PRICELIST";
export const RequestUpdatePricelist = () => createAction(REQUEST_UPDATE_PRICELIST);
export const RECEIVE_UPDATE_PRICELIST = "RECEIVE_UPDATE_PRICELIST";
export const ReceiveUpdatePricelist = (payload: IUpdatePricelistResponseOptions) =>
    createAction(RECEIVE_UPDATE_PRICELIST, payload);
type FetchUpdatePricelistType = ReturnType<typeof RequestUpdatePricelist | typeof ReceiveUpdatePricelist>;
export const FetchUpdatePricelist = (token: string, id: number, opts: IUpdatePricelistRequestOptions) => {
    return async (dispatch: Dispatch<FetchUpdatePricelistType>) => {
        dispatch(RequestUpdatePricelist());
        dispatch(
            ReceiveUpdatePricelist({
                meta: opts.meta,
                result: await updatePricelist(token, id, opts.request),
            }),
        );
    };
};

export const REQUEST_DELETE_PRICELIST = "REQUEST_DELETE_PRICELIST";
export const RequestDeletePricelist = () => createAction(REQUEST_DELETE_PRICELIST);
export const RECEIVE_DELETE_PRICELIST = "RECEIVE_DELETE_PRICELIST";
export const ReceiveDeletePricelist = (payload: number | null) => createAction(RECEIVE_DELETE_PRICELIST, payload);
type FetchDeletePricelistType = ReturnType<typeof RequestDeletePricelist | typeof ReceiveDeletePricelist>;
export const FetchDeletePricelist = (token: string, id: number) => {
    return async (dispatch: Dispatch<FetchDeletePricelistType>) => {
        dispatch(RequestDeletePricelist());
        dispatch(ReceiveDeletePricelist(await deletePricelist(token, id)));
    };
};

export const REQUEST_GET_PRICELISTS = "REQUEST_GET_PRICELISTS";
export const RequestGetPricelists = () => createAction(REQUEST_GET_PRICELISTS);
export const RECEIVE_GET_PRICELISTS = "RECEIVE_GET_PRICELISTS";
export const ReceiveGetPricelists = (payload: IGetPricelistsResponse) => createAction(RECEIVE_GET_PRICELISTS, payload);
type FetchGetPricelistsType = ReturnType<typeof RequestGetPricelists | typeof ReceiveGetPricelists>;
export const FetchGetPricelists = (token: string) => {
    return async (dispatch: Dispatch<FetchGetPricelistsType>) => {
        dispatch(RequestGetPricelists());
        dispatch(ReceiveGetPricelists(await getPricelists(token)));
    };
};

export const CHANGE_ENTRY_CREATELEVEL = "CHANGE_ENTRY_CREATELEVEL";
export const ChangeEntryCreateLevel = (payload: FetchLevel) => createAction(CHANGE_ENTRY_CREATELEVEL, payload);

export const CHANGE_SELECTED_LIST = "CHANGE_SELECTED_LIST";
export const ChangeSelectedList = (payload: IPricelistJson) => createAction(CHANGE_SELECTED_LIST, payload);

export const CHANGE_SELECTED_PROFESSION = "CHANGE_SELECTED_PROFESSION";
export const ChangeSelectedProfession = (payload: IProfession) => createAction(CHANGE_SELECTED_PROFESSION, payload);

export const CHANGE_SELECTED_EXPANSION = "CHANGE_SELECTED_EXPANSION";
export const ChangeSelectedExpansion = (payload: ISelectExpansionPayload) =>
    createAction(CHANGE_SELECTED_EXPANSION, payload);

export const CHANGE_IS_ADD_LIST_DIALOG_OPEN = "CHANGE_IS_ADD_LIST_DIALOG_OPEN";
export const ChangeIsAddListDialogOpen = (payload: boolean) => createAction(CHANGE_IS_ADD_LIST_DIALOG_OPEN, payload);

export const CHANGE_IS_EDIT_LIST_DIALOG_OPEN = "CHANGE_IS_EDIT_LIST_DIALOG_OPEN";
export const ChangeIsEditListDialogOpen = (payload: boolean) => createAction(CHANGE_IS_EDIT_LIST_DIALOG_OPEN, payload);

export const CHANGE_IS_DELETE_LIST_DIALOG_OPEN = "CHANGE_IS_DELETE_LIST_DIALOG_OPEN";
export const ChangeIsDeleteListDialogOpen = (payload: boolean) =>
    createAction(CHANGE_IS_DELETE_LIST_DIALOG_OPEN, payload);

export const CHANGE_IS_ADD_ENTRY_DIALOG_OPEN = "CHANGE_IS_ADD_ENTRY_DIALOG_OPEN";
export const ChangeIsAddEntryDialogOpen = (payload: boolean) => createAction(CHANGE_IS_ADD_ENTRY_DIALOG_OPEN, payload);

export const APPEND_ITEMS = "APPEND_ITEMS";
export const AppendItems = (payload: IItemsMap) => createAction(APPEND_ITEMS, payload);

export const REQUEST_CREATE_PROFESSIONPRICELIST = "REQUEST_CREATE_PROFESSIONPRICELIST";
export const RequestCreateProfessionPricelist = () => createAction(REQUEST_CREATE_PROFESSIONPRICELIST);
export const RECEIVE_CREATE_PROFESSIONPRICELIST = "RECEIVE_CREATE_PROFESSIONPRICELIST";
export const ReceiveCreateProfessionPricelist = (payload: ICreateProfessionPricelistResult) =>
    createAction(RECEIVE_CREATE_PROFESSIONPRICELIST, payload);
type FetchCreateProfessionPricelistType = ReturnType<
    typeof RequestCreateProfessionPricelist | typeof ReceiveCreatePricelist
>;
export const FetchCreateProfessionPricelist = (token: string, request: ICreateProfessionPricelistRequest) => {
    return async (dispatch: Dispatch<FetchCreateProfessionPricelistType>) => {
        dispatch(RequestCreateProfessionPricelist());
        dispatch(ReceiveCreateProfessionPricelist(await createProfessionPricelist(token, request)));
    };
};

export const REQUEST_DELETE_PROFESSIONPRICELIST = "REQUEST_DELETE_PROFESSIONPRICELIST";
export const RequestDeleteProfessionPricelist = () => createAction(REQUEST_DELETE_PROFESSIONPRICELIST);
export const RECEIVE_DELETE_PROFESSIONPRICELIST = "RECEIVE_DELETE_PROFESSIONPRICELIST";
export const ReceiveDeleteProfessionPricelist = (payload: number | null) =>
    createAction(RECEIVE_DELETE_PROFESSIONPRICELIST, payload);
type FetchDeleteProfessionPricelistType = ReturnType<
    typeof RequestDeleteProfessionPricelist | typeof ReceiveDeleteProfessionPricelist
>;
export const FetchDeleteProfessionPricelist = (token: string, id: number) => {
    return async (dispatch: Dispatch<FetchDeleteProfessionPricelistType>) => {
        dispatch(RequestDeleteProfessionPricelist());
        dispatch(ReceiveDeleteProfessionPricelist(await deleteProfessionPricelist(token, id)));
    };
};

export const REQUEST_GET_PROFESSIONPRICELISTS = "REQUEST_GET_PROFESSIONPRICELISTS";
export const RequestGetProfessionPricelists = () => createAction(REQUEST_GET_PROFESSIONPRICELISTS);
export const RECEIVE_GET_PROFESSIONPRICELISTS = "RECEIVE_GET_PROFESSIONPRICELISTS";
export const ReceiveGetProfessionPricelists = (payload: IGetProfessionPricelistsResult) =>
    createAction(RECEIVE_GET_PROFESSIONPRICELISTS, payload);
type FetchProfessionPricelistsType = ReturnType<
    typeof RequestGetProfessionPricelists | typeof ReceiveDeleteProfessionPricelist
>;
export const FetchGetProfessionPricelists = (profession: ProfessionName) => {
    return async (dispatch: Dispatch<FetchProfessionPricelistsType>) => {
        dispatch(RequestGetProfessionPricelists());
        dispatch(ReceiveGetProfessionPricelists(await getProfessionPricelists(profession)));
    };
};

export const RESET_PROFESSIONS_SELECTIONS = "RESET_PROFESSIONS_SELECTIONS";
export const ResetProfessionsSelections = () => createAction(RESET_PROFESSIONS_SELECTIONS);

export const REQUEST_GET_UNMETDEMAND = "REQUEST_GET_UNMETDEMAND";
export const RequestGetUnmetDemand = () => createAction(REQUEST_GET_UNMETDEMAND);
export const RECEIVE_GET_UNMETDEMAND = "RECEIVE_GET_UNMETDEMAND";
export const ReceiveGetUnmetDemand = (payload: IGetUnmetDemandResult | null) =>
    createAction(RECEIVE_GET_UNMETDEMAND, payload);
type FetchUnmetDemandType = ReturnType<typeof RequestGetUnmetDemand | typeof ReceiveGetUnmetDemand>;
export const FetchGetUnmetDemand = (opts: IGetUnmetDemandOptions) => {
    return async (dispatch: Dispatch<FetchUnmetDemandType>) => {
        dispatch(RequestGetUnmetDemand());
        dispatch(ReceiveGetUnmetDemand(await getUnmetDemand(opts)));
    };
};

export interface IProfessionNode {
    pricelist: IPricelistJson;
    expansion: IExpansion;
    profession: IProfession;
}

export const NAVIGATE_PROFESSIONNODE = "NAVIGATE_PROFESSIONNODE";
export const NavigateProfessionNode = (payload: IProfessionNode) => createAction(NAVIGATE_PROFESSIONNODE, payload);

export const REQUEST_GET_PRICELIST = "REQUEST_GET_PRICELIST";
export const RequestGetPricelist = () => createAction(REQUEST_GET_PRICELIST);
export const RECEIVE_GET_PRICELIST = "RECEIVE_GET_PRICELIST";
export const ReceiveGetPricelist = (payload: IGetPricelistResponse | null) =>
    createAction(RECEIVE_GET_PRICELIST, payload);
type FetchGetPricelist = ReturnType<typeof RequestGetPricelist | typeof ReceiveGetPricelist>;
export const FetchGetPricelist = (opts: IGetPriceListOptions) => {
    return async (dispatch: Dispatch<FetchGetPricelist>) => {
        dispatch(RequestGetPricelist());
        dispatch(ReceiveGetPricelist(await getPriceList(opts)));
    };
};

export const REQUEST_GET_PRICELISTHISTORY = "REQUEST_GET_PRICELISTHISTORY";
export const RequestGetPricelistHistory = () => createAction(REQUEST_GET_PRICELISTHISTORY);
export const RECEIVE_GET_PRICELISTHISTORY = "RECEIVE_GET_PRICELISTHISTORY";
export const ReceiveGetPricelistHistory = (payload: IGetPricelistHistoriesResponse | null) =>
    createAction(RECEIVE_GET_PRICELISTHISTORY, payload);
type FetchGetPricelistHistory = ReturnType<typeof RequestGetPricelistHistory | typeof ReceiveGetPricelistHistory>;
export const FetchGetPricelistHistory = (opts: IGetPriceListHistoryOptions) => {
    return async (dispatch: Dispatch<FetchGetPricelistHistory>) => {
        dispatch(RequestGetPricelistHistory());
        dispatch(ReceiveGetPricelistHistory(await getPriceListHistory(opts)));
    };
};

export const REQUEST_GET_ITEMSOWNERSHIP = "REQUEST_GET_ITEMSOWNERSHIP";
export const RequestGetItemsOwnership = () => createAction(REQUEST_GET_ITEMSOWNERSHIP);
export const RECEIVE_GET_ITEMSOWNERSHIP = "RECEIVE_GET_ITEMSOWNERSHIP";
export const ReceiveGetItemsOwnership = (payload: IQueryOwnerItemsResponse | null) =>
    createAction(RECEIVE_GET_ITEMSOWNERSHIP, payload);
type FetchGetItemsOwnership = ReturnType<typeof RequestGetItemsOwnership | typeof ReceiveGetItemsOwnership>;
export const FetchGetItemsOwnership = (opts: IQueryOwnersByItemsOptions) => {
    return async (dispatch: Dispatch<FetchGetItemsOwnership>) => {
        dispatch(RequestGetItemsOwnership());
        dispatch(ReceiveGetItemsOwnership(await queryOwnersByItems(opts)));
    };
};

export const PriceListsActions = {
    AppendItems,
    ChangeEntryCreateLevel,
    ChangeIsAddEntryDialogOpen,
    ChangeIsAddListDialogOpen,
    ChangeIsDeleteListDialogOpen,
    ChangeIsEditListDialogOpen,
    ChangeSelectedExpansion,
    ChangeSelectedList,
    ChangeSelectedProfession,
    NavigateProfessionNode,
    ReceiveCreatePricelist,
    ReceiveCreateProfessionPricelist,
    ReceiveDeletePricelist,
    ReceiveDeleteProfessionPricelist,
    ReceiveGetItemsOwnership,
    ReceiveGetPricelist,
    ReceiveGetPricelistHistory,
    ReceiveGetPricelists,
    ReceiveGetProfessionPricelists,
    ReceiveGetUnmetDemand,
    ReceiveUpdatePricelist,
    RequestCreatePricelist,
    RequestCreateProfessionPricelist,
    RequestDeletePricelist,
    RequestDeleteProfessionPricelist,
    RequestGetItemsOwnership,
    RequestGetPricelist,
    RequestGetPricelistHistory,
    RequestGetPricelists,
    RequestGetProfessionPricelists,
    RequestGetUnmetDemand,
    RequestUpdatePricelist,
    ResetProfessionsSelections,
};

export type PriceListsActions = ActionsUnion<typeof PriceListsActions>;
