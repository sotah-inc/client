import { combineReducers } from 'redux';

import { StoreState } from '@app/types';
import { main } from './main';
import { auction } from './auction';

export const rootReducer = combineReducers<StoreState>({
  Main: main,
  Auction: auction
});
