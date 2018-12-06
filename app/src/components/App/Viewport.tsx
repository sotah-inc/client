import * as React from "react";

import { Classes, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { News } from "@app/components/App/Content/News";
import { NotFound } from "@app/components/util/NotFound";
import { ContentRouteContainer } from "@app/route-containers/App/Content";
import { DataRouteContainer } from "@app/route-containers/App/Data";
import { AuctionListRouteContainer } from "@app/route-containers/App/Data/AuctionList";
import { PriceListsRouteContainer } from "@app/route-containers/App/Data/PriceLists";
import { RealmRouteContainer } from "@app/route-containers/App/Data/Realm";
import { RegionRouteContainer } from "@app/route-containers/App/Data/Region";
import { RootRouteContainer } from "@app/route-containers/App/Root";
import { FetchLevel } from "@app/types/main";

export interface IStateProps {
    fetchBootLevel: FetchLevel;
}

export interface IOwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<IOwnProps & IStateProps>;

export class Viewport extends React.Component<Props> {
    public render() {
        return <div id="content">{this.renderContent()}</div>;
    }

    private renderContent() {
        const { fetchBootLevel } = this.props;

        switch (fetchBootLevel) {
            case FetchLevel.success:
                return this.renderBootSuccess();
            case FetchLevel.fetching:
                return (
                    <NonIdealState
                        title="Loading"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.PRIMARY} />}
                    />
                );
            case FetchLevel.failure:
                return (
                    <NonIdealState
                        title="Failed to load"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={1} />}
                    />
                );
            case FetchLevel.initial:
            default:
                return (
                    <NonIdealState
                        title="Loading"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} value={0} />}
                    />
                );
        }
    }

    private renderBootSuccess() {
        return (
            <Switch>
                <Route exact={true} path="/" component={RootRouteContainer} />
                <Route exact={true} path="/content" component={ContentRouteContainer} />
                <Route exact={true} path="/content/news" component={News} />
                <Route exact={true} path="/data" component={DataRouteContainer} />
                <Route exact={true} path="/data/:region_name" component={RegionRouteContainer} />
                <Route exact={true} path="/data/:region_name/:realm_slug" component={RealmRouteContainer} />
                <Route
                    exact={true}
                    path="/data/:region_name/:realm_slug/auctions"
                    component={AuctionListRouteContainer}
                />
                <Route
                    exact={true}
                    path="/data/:region_name/:realm_slug/professions"
                    component={PriceListsRouteContainer}
                />
                <Route component={NotFound} />
            </Switch>
        );
    }
}
