import {
  PriceListsState,
  defaultPriceListsState
} from '@app/types/price-lists';
import {
  PriceListsActions
} from '@app/actions/price-lists';

type State = Readonly<PriceListsState> | undefined;

export const priceLists = (state: State, action: PriceListsActions): State => {
  if (state === undefined) {
    return defaultPriceListsState;
  }

  switch (action.type) {
    default:
      return state;
  }
};
