import { Dispatch } from 'redux';

import { Pricelist, PricelistEntry, EntryCreateLevel } from '@app/types/price-lists';
import {
  CreatePricelistRequest, CreatePricelistResponse, createPricelist
} from '@app/api/price-lists';

import { createAction, ActionsUnion } from './helpers';

export const REQUEST_CREATE_PRICELIST = 'REQUEST_CREATE_PRICELIST';
export const RequestCreatePricelist = () => createAction(REQUEST_CREATE_PRICELIST);
export const RECEIVE_CREATE_PRICELIST = 'RECEIVE_CREATE_PRICELIST';
export const ReceiveCreatePricelist = (
  payload: CreatePricelistResponse
) => createAction(RECEIVE_CREATE_PRICELIST, payload);
type FetchCreatePricelistType = ReturnType<typeof RequestCreatePricelist | typeof ReceiveCreatePricelist>;
export const FetchCreatePricelist = (token: string, request: CreatePricelistRequest) => {
  return async (dispatch: Dispatch<FetchCreatePricelistType>) => {
    dispatch(RequestCreatePricelist());
    dispatch(ReceiveCreatePricelist(await createPricelist(token, request)));
  };
};

export const CREATE_PRICELIST_ENTRY = 'CREATE_PRICELIST_ENTRY';
export const CreateEntry = (payload: PricelistEntry) => createAction(CREATE_PRICELIST_ENTRY, payload);

export const CHANGE_ENTRY_CREATELEVEL = 'CHANGE_ENTRY_CREATELEVEL';
export const ChangeEntryCreateLevel = (payload: EntryCreateLevel) => createAction(CHANGE_ENTRY_CREATELEVEL, payload);

export const CHANGE_SELECTED_LIST = 'CHANGE_SELECTED_LIST';
export const ChangeSelectedList = (payload: Pricelist) => createAction(CHANGE_SELECTED_LIST, payload);

export const CHANGE_IS_ADD_LIST_DIALOG_OPEN = 'CHANGE_IS_ADD_LIST_DIALOG_OPEN';
export const ChangeIsAddListDialogOpen = (payload: boolean) => createAction(CHANGE_IS_ADD_LIST_DIALOG_OPEN, payload);

export const CHANGE_IS_ADD_ENTRY_DIALOG_OPEN = 'CHANGE_IS_ADD_ENTRY_DIALOG_OPEN';
export const ChangeIsAddEntryDialogOpen = (payload: boolean) => createAction(CHANGE_IS_ADD_ENTRY_DIALOG_OPEN, payload);

export const PriceListsActions = {
  RequestCreatePricelist, ReceiveCreatePricelist,
  CreateEntry, ChangeEntryCreateLevel,
  ChangeSelectedList,
  ChangeIsAddListDialogOpen, ChangeIsAddEntryDialogOpen
};

export type PriceListsActions = ActionsUnion<typeof PriceListsActions>;
