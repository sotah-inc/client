import {
  PriceListsState,
  PriceList,
  ListCreateLevel,
  EntryCreateLevel,
  defaultPriceListsState
} from '@app/types/price-lists';
import {
  CREATE_PRICELIST, CHANGE_LIST_CREATELEVEL,
  CREATE_PRICELIST_ENTRY, CHANGE_ENTRY_CREATELEVEL,
  CHANGE_SELECTED_LIST,
  CHANGE_IS_ADD_LIST_DIALOG_OPEN,
  PriceListsActions
} from '@app/actions/price-lists';

type State = Readonly<PriceListsState> | undefined;

export const priceLists = (state: State, action: PriceListsActions): State => {
  if (state === undefined) {
    return defaultPriceListsState;
  }

  switch (action.type) {
    case CREATE_PRICELIST:
      const createdPricelist: PriceList = {
        ...action.payload,
        entries: [],
        id: state.lists.length
      };
      const createdList: PriceList[] = [
        ...state.lists,
        createdPricelist
      ];
      return {
        ...state,
        lists: createdList,
        listCreateLevel: ListCreateLevel.success,
        selectedList: createdPricelist
      };
    case CHANGE_LIST_CREATELEVEL:
      return { ...state, listCreateLevel: action.payload };
    case CREATE_PRICELIST_ENTRY:
      const foundListIndex: number = state.lists.reduce(
        (result, v, i) => {
          if (state.selectedList === null) {
            return -1;
          }

          if (result !== -1) {
            return result;
          }

          if (v.id === state.selectedList.id) {
            return i;
          }

          return -1;
        },
        -1
      );

      if (foundListIndex === -1) {
        return { ...state };
      }

      const foundList = state.lists[foundListIndex];
      foundList.entries = [
        ...foundList.entries,
        action.payload
      ];

      return {
        ...state,
        lists: [...state.lists.slice(0, foundListIndex), foundList, ...state.lists.slice(foundListIndex + 1)],
        entryCreateLevel: EntryCreateLevel.success
      };
    case CHANGE_ENTRY_CREATELEVEL:
    return { ...state, entryCreateLevel: action.payload };
    case CHANGE_SELECTED_LIST:
      return { ...state, selectedList: action.payload };
    case CHANGE_IS_ADD_LIST_DIALOG_OPEN:
      return { ...state, isAddListDialogOpen: action.payload };
    default:
      return state;
  }
};
