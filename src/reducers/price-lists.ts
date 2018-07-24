import {
  PriceListsState,
  CreatePricelistLevel,
  GetPricelistsLevel,
  defaultPriceListsState
} from '@app/types/price-lists';
import {
  REQUEST_CREATE_PRICELIST, RECEIVE_CREATE_PRICELIST,
  REQUEST_GET_PRICELISTS, RECEIVE_GET_PRICELISTS,
  CHANGE_ENTRY_CREATELEVEL,
  CHANGE_SELECTED_LIST,
  CHANGE_IS_ADD_LIST_DIALOG_OPEN, CHANGE_IS_ADD_ENTRY_DIALOG_OPEN,
  PriceListsActions
} from '@app/actions/price-lists';

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
    case REQUEST_GET_PRICELISTS:
      return {
        ...state,
        getPricelistsLevel: GetPricelistsLevel.fetching
      };
    case RECEIVE_GET_PRICELISTS:
      return {
        ...state,
        pricelists: action.payload.pricelists,
        getPricelistsLevel: GetPricelistsLevel.success
      };
    case CHANGE_ENTRY_CREATELEVEL:
      return { ...state, entryCreateLevel: action.payload };
    case CHANGE_SELECTED_LIST:
      return { ...state, selectedList: action.payload };
    case CHANGE_IS_ADD_LIST_DIALOG_OPEN:
      return { ...state, isAddListDialogOpen: action.payload };
    case CHANGE_IS_ADD_ENTRY_DIALOG_OPEN:
      return { ...state, isAddEntryDialogOpen: action.payload };
    default:
      return state;
  }
};
