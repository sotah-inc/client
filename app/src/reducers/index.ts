import { combineReducers } from "redux";

import { IStoreState } from "@app/types";
import { auction } from "./auction";
import { main } from "./main";
import { priceLists } from "./price-lists";

export const rootReducer = combineReducers<IStoreState>({
    Auction: auction,
    Main: main,
    PriceLists: priceLists,
});
