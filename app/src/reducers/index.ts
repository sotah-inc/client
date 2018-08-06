import { combineReducers } from "redux";

import { StoreState } from "@app/types";
import { auction } from "./auction";
import { main } from "./main";
import { priceLists } from "./price-lists";

export const rootReducer = combineReducers<StoreState>({
    Main: main,
    Auction: auction,
    PriceLists: priceLists,
});
