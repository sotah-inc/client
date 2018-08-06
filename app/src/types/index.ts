import { AuctionState } from "./auction";
import { MainState } from "./main";
import { PriceListsState } from "./price-lists";
export { defaultMainState } from "./main";
export { defaultAuctionState } from "./auction";
export { defaultPriceListsState } from "./price-lists";

export interface StoreState {
    Main: MainState;
    Auction: AuctionState;
    PriceLists: PriceListsState;
}
