import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { PriceListsContainer } from "@app/containers/App/PriceLists";
import { AuctionListRouteContainer } from "@app/route-containers/App/AuctionList";
import { ContentRouteContainer } from "@app/route-containers/App/Content";
import { DataRouteContainer } from "@app/route-containers/App/Data";
import { RootRouteContainer } from "@app/route-containers/App/Root";
import { NotFound } from "../util/NotFound";

export const Viewport: React.SFC = () => {
    return (
        <div id="content">
            <Switch>
                <Route exact={true} path="/" component={RootRouteContainer} />
                <Route exact={true} path="/content" component={ContentRouteContainer} />
                <Route exact={true} path="/data" component={DataRouteContainer} />
                <Route
                    exact={true}
                    path="/data/auctions/:region_name/:realm_slug"
                    component={AuctionListRouteContainer}
                />
                <Route exact={true} path="/data/price-lists" component={PriceListsContainer} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};
