import { combineReducers } from 'redux';

import { StoreState } from '@app/types';
import { main } from './main';
import { auction } from './auction';
import { priceLists } from './price-lists';

export const rootReducer = combineReducers<StoreState>({
  Main: main,
  Auction: auction,
  PriceLists: priceLists
});
