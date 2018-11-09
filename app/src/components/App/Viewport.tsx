import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { AuctionsListContainer } from "@app/containers/App/AuctionList";
import { PriceListsContainer } from "@app/containers/App/PriceLists";
import { ContentRouteContainer } from "@app/route-containers/App/Content";
import { RootRouteContainer } from "@app/route-containers/App/Root";
import { NotFound } from "../util/NotFound";

export const Viewport: React.SFC = () => {
    return (
        <div id="content">
            <Switch>
                <Route exact={true} path="/" component={RootRouteContainer} />
                <Route exact={true} path="/content" component={ContentRouteContainer} />
                <Route exact={true} path="/data/auctions" component={AuctionsListContainer} />
                <Route exact={true} path="/data/price-lists" component={PriceListsContainer} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};
