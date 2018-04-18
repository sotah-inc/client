import { MainState } from './main';
import { AuctionState } from './auction';
export { defaultMainState } from './main';
export { defaultAuctionState } from './auction';

export type StoreState = {
  Main: MainState
  Auction: AuctionState
};
