import { Dispatch } from "redux";

import {
    createPricelist,
    createProfessionPricelist,
    deletePricelist,
    deleteProfessionPricelist,
    getPricelists,
    getProfessionPricelists,
    ICreatePricelistRequest,
    ICreatePricelistResponse,
    ICreateProfessionPricelistRequest,
    ICreateProfessionPricelistResponse,
    IDeletePricelistRequestOptions,
    IDeleteProfessionPricelistRequestOptions,
    IGetPricelistsOptions,
    IGetPricelistsResponse,
    IGetProfessionPricelistsRequestOptions,
    IGetProfessionPricelistsResponse,
    updatePricelist,
} from "@app/api/price-lists";
import { IProfession, ItemsMap } from "@app/types/global";
import {
    EntryCreateLevel,
    IPricelist,
    ISelectExpansionPayload,
    IUpdatePricelistRequestOptions,
    IUpdatePricelistResponseOptions,
} from "@app/types/price-lists";

import { ActionsUnion, createAction } from "./helpers";

export const REQUEST_CREATE_PRICELIST = "REQUEST_CREATE_PRICELIST";
export const RequestCreatePricelist = () => createAction(REQUEST_CREATE_PRICELIST);
export const RECEIVE_CREATE_PRICELIST = "RECEIVE_CREATE_PRICELIST";
export const ReceiveCreatePricelist = (payload: ICreatePricelistResponse) =>
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
export const FetchUpdatePricelist = (opts: IUpdatePricelistRequestOptions) => {
    return async (dispatch: Dispatch<FetchUpdatePricelistType>) => {
        dispatch(RequestUpdatePricelist());
        dispatch(
            ReceiveUpdatePricelist({
                meta: opts.meta,
                response: await updatePricelist(opts.request),
            }),
        );
    };
};

export const REQUEST_DELETE_PRICELIST = "REQUEST_DELETE_PRICELIST";
export const RequestDeletePricelist = () => createAction(REQUEST_DELETE_PRICELIST);
export const RECEIVE_DELETE_PRICELIST = "RECEIVE_DELETE_PRICELIST";
export const ReceiveDeletePricelist = (payload: number | null) => createAction(RECEIVE_DELETE_PRICELIST, payload);
type FetchDeletePricelistType = ReturnType<typeof RequestDeletePricelist | typeof ReceiveDeletePricelist>;
export const FetchDeletePricelist = (opts: IDeletePricelistRequestOptions) => {
    return async (dispatch: Dispatch<FetchDeletePricelistType>) => {
        dispatch(RequestDeletePricelist());
        dispatch(ReceiveDeletePricelist(await deletePricelist(opts)));
    };
};

export const REQUEST_GET_PRICELISTS = "REQUEST_GET_PRICELISTS";
export const RequestGetPricelists = () => createAction(REQUEST_GET_PRICELISTS);
export const RECEIVE_GET_PRICELISTS = "RECEIVE_GET_PRICELISTS";
export const ReceiveGetPricelists = (payload: IGetPricelistsResponse) => createAction(RECEIVE_GET_PRICELISTS, payload);
type FetchGetPricelistsType = ReturnType<typeof RequestGetPricelists | typeof ReceiveGetPricelists>;
export const FetchGetPricelists = (opts: IGetPricelistsOptions) => {
    return async (dispatch: Dispatch<FetchGetPricelistsType>) => {
        dispatch(RequestGetPricelists());
        dispatch(ReceiveGetPricelists(await getPricelists(opts)));
    };
};

export const CHANGE_ENTRY_CREATELEVEL = "CHANGE_ENTRY_CREATELEVEL";
export const ChangeEntryCreateLevel = (payload: EntryCreateLevel) => createAction(CHANGE_ENTRY_CREATELEVEL, payload);

export const CHANGE_SELECTED_LIST = "CHANGE_SELECTED_LIST";
export const ChangeSelectedList = (payload: IPricelist) => createAction(CHANGE_SELECTED_LIST, payload);

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
export const AppendItems = (payload: ItemsMap) => createAction(APPEND_ITEMS, payload);

export const REQUEST_CREATE_PROFESSION_PRICELIST = "REQUEST_CREATE_PROFESSION_PRICELIST";
export const RequestCreateProfessionPricelist = () => createAction(REQUEST_CREATE_PROFESSION_PRICELIST);
export const RECEIVE_CREATE_PROFESSION_PRICELIST = "RECEIVE_CREATE_PROFESSION_PRICELIST";
export const ReceiveCreateProfessionPricelist = (payload: ICreateProfessionPricelistResponse) =>
    createAction(RECEIVE_CREATE_PROFESSION_PRICELIST, payload);
type FetchCreateProfessionPricelistType = ReturnType<
    typeof RequestCreateProfessionPricelist | typeof ReceiveCreatePricelist
>;
export const FetchCreateProfessionPricelist = (token: string, request: ICreateProfessionPricelistRequest) => {
    return async (dispatch: Dispatch<FetchCreateProfessionPricelistType>) => {
        dispatch(RequestCreateProfessionPricelist());
        dispatch(ReceiveCreateProfessionPricelist(await createProfessionPricelist(token, request)));
    };
};

export const REQUEST_DELETE_PROFESSION_PRICELIST = "REQUEST_DELETE_PROFESSION_PRICELIST";
export const RequestDeleteProfessionPricelist = () => createAction(REQUEST_DELETE_PROFESSION_PRICELIST);
export const RECEIVE_DELETE_PROFESSION_PRICELIST = "RECEIVE_DELETE_PROFESSION_PRICELIST";
export const ReceiveDeleteProfessionPricelist = (payload: number | null) =>
    createAction(RECEIVE_DELETE_PROFESSION_PRICELIST, payload);
type FetchDeleteProfessionPricelistType = ReturnType<
    typeof RequestDeleteProfessionPricelist | typeof ReceiveDeleteProfessionPricelist
>;
export const FetchDeleteProfessionPricelist = (opts: IDeleteProfessionPricelistRequestOptions) => {
    return async (dispatch: Dispatch<FetchDeleteProfessionPricelistType>) => {
        dispatch(RequestDeleteProfessionPricelist());
        dispatch(ReceiveDeleteProfessionPricelist(await deleteProfessionPricelist(opts)));
    };
};

export const REQUEST_PROFESSION_PRICELISTS = "GET_PROFESSION_PRICELISTS";
export const RequestProfessionPricelists = () => createAction(REQUEST_PROFESSION_PRICELISTS);
export const RECEIVE_PROFESSION_PRICELISTS = "RECEIVE_PROFESSION_PRICELISTS";
export const ReceiveProfessionPricelists = (payload: IGetProfessionPricelistsResponse) =>
    createAction(RECEIVE_PROFESSION_PRICELISTS, payload);
type FetchProfessionPricelistsType = ReturnType<
    typeof RequestProfessionPricelists | typeof ReceiveDeleteProfessionPricelist
>;
export const FetchProfessionPricelists = (opts: IGetProfessionPricelistsRequestOptions) => {
    return async (dispatch: Dispatch<FetchProfessionPricelistsType>) => {
        dispatch(RequestProfessionPricelists());
        dispatch(ReceiveProfessionPricelists(await getProfessionPricelists(opts)));
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
    ReceiveCreatePricelist,
    ReceiveCreateProfessionPricelist,
    ReceiveDeletePricelist,
    ReceiveGetPricelists,
    ReceiveProfessionPricelists,
    ReceiveUpdatePricelist,
    RequestCreatePricelist,
    RequestCreateProfessionPricelist,
    RequestDeletePricelist,
    RequestGetPricelists,
    RequestProfessionPricelists,
    RequestUpdatePricelist,
};

export type PriceListsActions = ActionsUnion<typeof PriceListsActions>;
