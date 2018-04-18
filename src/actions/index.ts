import { MainActions } from './main';
import { AuctionActions } from './auction';
export { MainActions } from './main';
export { AuctionActions } from './auction';

export type Actions = MainActions | AuctionActions;
