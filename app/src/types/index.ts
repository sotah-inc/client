import { MainState } from './main';
import { AuctionState } from './auction';
import { PriceListsState } from './price-lists';
export { defaultMainState } from './main';
export { defaultAuctionState } from './auction';
export { defaultPriceListsState } from './price-lists';

export type StoreState = {
  Main: MainState
  Auction: AuctionState,
  PriceLists: PriceListsState
};
