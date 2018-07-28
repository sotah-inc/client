import {
  PriceListsState,
  CreatePricelistLevel,
  UpdatePricelistLevel,
  GetPricelistsLevel,
  Pricelist,
  defaultPriceListsState
} from '@app/types/price-lists';
import {
  REQUEST_CREATE_PRICELIST, RECEIVE_CREATE_PRICELIST,
  REQUEST_UPDATE_PRICELIST, RECEIVE_UPDATE_PRICELIST,
  REQUEST_GET_PRICELISTS, RECEIVE_GET_PRICELISTS,
  CHANGE_ENTRY_CREATELEVEL,
  CHANGE_SELECTED_LIST,
  CHANGE_IS_ADD_LIST_DIALOG_OPEN, CHANGE_IS_EDIT_LIST_DIALOG_OPEN, CHANGE_IS_DELETE_LIST_DIALOG_OPEN,
  CHANGE_IS_ADD_ENTRY_DIALOG_OPEN,
  REQUEST_DELETE_PRICELIST, RECEIVE_DELETE_PRICELIST,
  PriceListsActions
} from '@app/actions/price-lists';
import { getPricelistIndex } from './helper';

type State = Readonly<PriceListsState> | undefined;

export const priceLists = (state: State, action: PriceListsActions): State => {
  if (state === undefined) {
    return defaultPriceListsState;
  }

  switch (action.type) {
    case REQUEST_CREATE_PRICELIST:
      return { ...state, createPricelistLevel: CreatePricelistLevel.fetching };
    case RECEIVE_CREATE_PRICELIST:
      if (action.payload.errors !== null) {
        return {
          ...state,
          createPricelistLevel: CreatePricelistLevel.failure,
          createPricelistErrors: action.payload.errors
        };
      }

      return {
        ...state,
        createPricelistLevel: CreatePricelistLevel.success,
        createPricelistErrors: {},
        isAddListDialogOpen: false
      };
    case REQUEST_UPDATE_PRICELIST:
      return { ...state, updatePricelistLevel: UpdatePricelistLevel.fetching };
    case RECEIVE_UPDATE_PRICELIST:
      if (action.payload.response.errors !== null) {
        return {
          ...state,
          updatePricelistLevel: UpdatePricelistLevel.failure,
          updatePricelistErrors: action.payload.response.errors
        };
      }

      const replacedIndex = getPricelistIndex(state.pricelists, action.payload.response.data!.pricelist.id);
      const replacedPricelist = action.payload.response.data!.pricelist;
      replacedPricelist.pricelist_entries = action.payload.response.data!.entries;

      return {
        ...state,
        ...action.payload.meta,
        updatePricelistLevel: UpdatePricelistLevel.success,
        updatePricelistErrors: {},
        pricelists: [
          ...state.pricelists.splice(0, replacedIndex),
          replacedPricelist,
          ...state.pricelists.splice(replacedIndex + 1)
        ],
        selectedList: replacedPricelist
      };
    case REQUEST_DELETE_PRICELIST:
      return { ...state };
    case RECEIVE_DELETE_PRICELIST:
      const deletedIndex = getPricelistIndex(state.pricelists, action.payload!);
      const onDeletePricelists = [
        ...state.pricelists.splice(0, deletedIndex),
        ...state.pricelists.splice(deletedIndex + 1)
      ];
      let onDeleteSelectedList: Pricelist | null = null;
      if (onDeletePricelists.length > 0) {
        const isLastDeleted = deletedIndex === onDeletePricelists.length;
        if (isLastDeleted) {
          onDeleteSelectedList = onDeletePricelists[deletedIndex - 1];
        } else {
          onDeleteSelectedList = onDeletePricelists[deletedIndex];
        }
      }

      return {
        ...state,
        isDeleteListDialogOpen: false,
        selectedList: onDeleteSelectedList,
        pricelists: onDeletePricelists
      };
    case REQUEST_GET_PRICELISTS:
      return {
        ...state,
        getPricelistsLevel: GetPricelistsLevel.fetching
      };
    case RECEIVE_GET_PRICELISTS:
      let receivedSelectedList: Pricelist | null = null;
      if (Object.keys(action.payload.pricelists).length > 0) {
        receivedSelectedList = action.payload.pricelists[Object.keys(action.payload.pricelists)[0]];
      }

      return {
        ...state,
        pricelists: action.payload.pricelists,
        getPricelistsLevel: GetPricelistsLevel.success,
        selectedList: receivedSelectedList
      };
    case CHANGE_ENTRY_CREATELEVEL:
      return { ...state, entryCreateLevel: action.payload };
    case CHANGE_SELECTED_LIST:
      return { ...state, selectedList: action.payload };
    case CHANGE_IS_ADD_LIST_DIALOG_OPEN:
      return { ...state, isAddListDialogOpen: action.payload };
    case CHANGE_IS_EDIT_LIST_DIALOG_OPEN:
      return { ...state, isEditListDialogOpen: action.payload };
    case CHANGE_IS_DELETE_LIST_DIALOG_OPEN:
      return { ...state, isDeleteListDialogOpen: action.payload };
    case CHANGE_IS_ADD_ENTRY_DIALOG_OPEN:
      return { ...state, isAddEntryDialogOpen: action.payload };
    default:
      return state;
  }
};
