import { Dispatch } from 'redux';

import { PriceList, PriceListEntry, ListCreateLevel, EntryCreateLevel } from '@app/types/price-lists';
import {
  CreatePricelistRequest, CreatePricelistResponse, createPriceList
} from '@app/api/price-lists';

import { createAction, ActionsUnion } from './helpers';

export const REQUEST_CREATE_PRICELIST = 'REQUEST_CREATE_PRICELIST';
export const RequestCreatePricelist = () => createAction(REQUEST_CREATE_PRICELIST);
export const RECEIVE_CREATE_PRICELIST = 'RECEIVE_CREATE_PRICELIST';
export const ReceiveCreatePricelist = (
  payload: CreatePricelistResponse | null
) => createAction(RECEIVE_CREATE_PRICELIST, payload);
type FetchCreatePricelistType = ReturnType<typeof RequestCreatePricelist | typeof ReceiveCreatePricelist>;
export const FetchCreatePricelist = (request: CreatePricelistRequest) => {
  return async (dispatch: Dispatch<FetchCreatePricelistType>) => {
    dispatch(RequestCreatePricelist());
    dispatch(ReceiveCreatePricelist(await createPriceList(request)));
  };
};

export const CHANGE_LIST_CREATELEVEL = 'CHANGE_LIST_CREATELEVEL';
export const ChangeListCreateLevel = (payload: ListCreateLevel) => createAction(CHANGE_LIST_CREATELEVEL, payload);

export const CREATE_PRICELIST_ENTRY = 'CREATE_PRICELIST_ENTRY';
export const CreateEntry = (payload: PriceListEntry) => createAction(CREATE_PRICELIST_ENTRY, payload);

export const CHANGE_ENTRY_CREATELEVEL = 'CHANGE_ENTRY_CREATELEVEL';
export const ChangeEntryCreateLevel = (payload: EntryCreateLevel) => createAction(CHANGE_ENTRY_CREATELEVEL, payload);

export const CHANGE_SELECTED_LIST = 'CHANGE_SELECTED_LIST';
export const ChangeSelectedList = (payload: PriceList) => createAction(CHANGE_SELECTED_LIST, payload);

export const CHANGE_IS_ADD_LIST_DIALOG_OPEN = 'CHANGE_IS_ADD_LIST_DIALOG_OPEN';
export const ChangeIsAddListDialogOpen = (payload: boolean) => createAction(CHANGE_IS_ADD_LIST_DIALOG_OPEN, payload);

export const CHANGE_IS_ADD_ENTRY_DIALOG_OPEN = 'CHANGE_IS_ADD_ENTRY_DIALOG_OPEN';
export const ChangeIsAddEntryDialogOpen = (payload: boolean) => createAction(CHANGE_IS_ADD_ENTRY_DIALOG_OPEN, payload);

export const PriceListsActions = {
  RequestCreatePricelist, ChangeListCreateLevel,
  CreateEntry, ChangeEntryCreateLevel,
  ChangeSelectedList,
  ChangeIsAddListDialogOpen, ChangeIsAddEntryDialogOpen
};

export type PriceListsActions = ActionsUnion<typeof PriceListsActions>;
