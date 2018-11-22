import * as React from "react";

import { Classes, Intent, NonIdealState, Spinner } from "@blueprintjs/core";

import { IRealm, IRegion } from "@app/api-types/region";
import { IRealms, IRegions } from "@app/types/global";
import { AuthLevel, FetchLevel } from "@app/types/main";

export interface IStateProps {
    fetchRealmLevel: FetchLevel;
    realms: IRealms;
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    authLevel: AuthLevel;
    regions: IRegions;
}

export interface IDispatchProps {
    onRegionChange: (region: IRegion) => void;
    onRealmChange: (realm: IRealm) => void;
}

export interface IOwnProps {
    region_name: string;
    realm_slug: string;
    children: React.ReactNode;
}

export type Props = Readonly<IOwnProps & IStateProps & IDispatchProps>;

export class RealmRouteParser extends React.Component<Props> {
    public render() {
        const { currentRegion, region_name } = this.props;

        if (currentRegion === null) {
            return (
                <NonIdealState
                    title="Loading"
                    icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={0} />}
                />
            );
        }

        if (currentRegion.name !== region_name) {
            return this.renderUnmatchedRegion();
        }

        return this.renderMatchedRegion();
    }

    private renderMatchedRegion() {
        const { fetchRealmLevel } = this.props;

        switch (fetchRealmLevel) {
            case FetchLevel.prompted:
            case FetchLevel.fetching:
            case FetchLevel.refetching:
                return (
                    <NonIdealState
                        title="Loading"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.PRIMARY} />}
                    />
                );
            case FetchLevel.failure:
                return (
                    <NonIdealState
                        title="Failed to load realms"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={1} />}
                    />
                );
            case FetchLevel.success:
                return this.renderMatchedRegionWithRealms();
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

    private renderMatchedRegionWithRealms() {
        const { currentRealm, currentRegion, realm_slug, realms, onRealmChange, children } = this.props;

        if (currentRegion === null || currentRealm === null) {
            return (
                <NonIdealState
                    title="No region or realm!"
                    icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={1} />}
                />
            );
        }

        if (!(realm_slug in realms)) {
            return (
                <NonIdealState
                    title={`Realm ${realm_slug} in region ${currentRegion.name} not found!`}
                    icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={1} />}
                />
            );
        }

        if (realm_slug !== currentRealm.slug) {
            onRealmChange(realms[realm_slug]);

            return <NonIdealState title="Loading" icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} />} />;
        }

        return children;
    }

    private renderUnmatchedRegion() {
        const { regions, onRegionChange, region_name } = this.props;

        if (!(region_name in regions)) {
            return (
                <NonIdealState
                    title={`Region ${region_name} not found!`}
                    icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={1} />}
                />
            );
        }

        onRegionChange(regions[region_name]);

        return <NonIdealState title="Loading" icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} />} />;
    }
}
