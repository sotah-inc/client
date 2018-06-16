import {
  PriceListsState,
  PriceList,
  OnCreateLevel,
  defaultPriceListsState
} from '@app/types/price-lists';
import {
  CREATE_PRICELIST,
  PriceListsActions
} from '@app/actions/price-lists';

type State = Readonly<PriceListsState> | undefined;

export const priceLists = (state: State, action: PriceListsActions): State => {
  if (state === undefined) {
    return defaultPriceListsState;
  }

  switch (action.type) {
    case CREATE_PRICELIST:
      const createdList: PriceList[] = [
        ...state.lists,
        { name: action.payload, entries: [], id: -1 }
      ];
      return { ...state, lists: createdList, onCreateLevel: OnCreateLevel.success };
    default:
      return state;
  }
};
