import { IAuctionState } from "./auction";
import { IMainState } from "./main";
import { IPriceListsState } from "./price-lists";
export { defaultMainState } from "./main";
export { defaultAuctionState } from "./auction";
export { defaultPriceListsState } from "./price-lists";

export interface IStoreState {
    Main: IMainState;
    Auction: IAuctionState;
    PriceLists: IPriceListsState;
}
