import { MainActions } from './main';
export { MainActions } from './main';
import { AuctionActions } from './auction';
export { AuctionActions } from './auction';
import { PriceListsActions } from './price-lists';
export { PriceListsActions } from './price-lists';

export type Actions = MainActions | AuctionActions | PriceListsActions;
