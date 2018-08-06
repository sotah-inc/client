import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { AuctionsListContainer } from "@app/containers/App/AuctionList";
import { PriceListsContainer } from "@app/containers/App/PriceLists";
import { NotFound } from "../util/NotFound";

export const Content: React.SFC = () => {
    return (
        <div id="content">
            <Switch>
                <Route exact={true} path="/auctions" component={AuctionsListContainer} />
                <Route exact={true} path="/price-lists" component={PriceListsContainer} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};
