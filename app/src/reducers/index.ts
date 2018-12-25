import { combineReducers } from "redux";

import { IStoreState } from "@app/types";
import { auction } from "./auction";
import { main } from "./main";
import { posts } from "./posts";
import { priceLists } from "./price-lists";

export const rootReducer = combineReducers<IStoreState>({
    Auction: auction,
    Main: main,
    Posts: posts,
    PriceLists: priceLists,
});
