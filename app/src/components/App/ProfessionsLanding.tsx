import * as React from "react";

import { Classes, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import { Redirect, RouteComponentProps } from "react-router-dom";

import { IRealm, IRegion } from "@app/api-types/region";
import { IRegions } from "@app/types/global";
import { FetchLevel } from "@app/types/main";
import { setTitle } from "@app/util";

export interface IStateProps {
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    fetchRealmLevel: FetchLevel;
    regions: IRegions;
}

export interface IDispatchProps {
    fetchRealms: (region: IRegion) => void;
    onRegionChange: (region: IRegion) => void;
}

interface IRouteParams {
    region_name?: string;
}

export interface IOwnProps extends RouteComponentProps<IRouteParams> {}

export type Props = Readonly<IStateProps & IDispatchProps & IOwnProps>;

export class ProfessionsLanding extends React.Component<Props> {
    public componentDidMount() {
        const {
            currentRegion,
            match: {
                params: { region_name },
            },
            onRegionChange,
            regions,
            fetchRealmLevel,
            fetchRealms,
        } = this.props;

        if (currentRegion === null) {
            return;
        }

        if (typeof region_name !== "undefined" && currentRegion.name !== region_name) {
            if (region_name in regions) {
                onRegionChange(regions[region_name]);

                return;
            }

            return;
        }

        switch (fetchRealmLevel) {
            case FetchLevel.initial:
            case FetchLevel.prompted:
                fetchRealms(currentRegion);

                return;
            case FetchLevel.success:
                break;
            default:
                return;
        }

        this.setTitle();
    }

    public componentDidUpdate() {
        const {
            match: {
                params: { region_name },
            },
            fetchRealmLevel,
            currentRegion,
            fetchRealms,
            currentRealm,
            regions,
            onRegionChange,
        } = this.props;

        if (currentRegion === null) {
            return;
        }

        if (typeof region_name !== "undefined" && currentRegion.name !== region_name) {
            switch (fetchRealmLevel) {
                case FetchLevel.success:
                    if (!(region_name in regions)) {
                        return;
                    }

                    onRegionChange(regions[region_name]);

                    return;
                default:
                    return;
            }
        }

        switch (fetchRealmLevel) {
            case FetchLevel.initial:
            case FetchLevel.prompted:
                fetchRealms(currentRegion);

                return;
            case FetchLevel.success:
                break;
            default:
                return;
        }

        if (currentRealm === null) {
            return;
        }

        this.setTitle();
    }

    public render() {
        const {
            currentRealm,
            currentRegion,
            fetchRealmLevel,
            match: {
                params: { region_name },
            },
        } = this.props;

        if (currentRegion === null) {
            return (
                <NonIdealState
                    title="Loading region"
                    icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={0} />}
                />
            );
        }

        if (typeof region_name !== "undefined" && currentRegion.name !== region_name) {
            return (
                <NonIdealState
                    title="Changing region"
                    icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} />}
                />
            );
        }

        switch (fetchRealmLevel) {
            case FetchLevel.success:
                break;
            case FetchLevel.failure:
                return (
                    <NonIdealState
                        title="Failed to load realms"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={1} />}
                    />
                );
            case FetchLevel.fetching:
                return (
                    <NonIdealState
                        title="Loading realms"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.PRIMARY} />}
                    />
                );
            case FetchLevel.initial:
            default:
                return (
                    <NonIdealState
                        title="Loading realms"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} />}
                    />
                );
        }

        if (currentRealm === null) {
            return (
                <NonIdealState
                    title="Loading realm"
                    icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={0} />}
                />
            );
        }

        return <Redirect to={`/data/${currentRegion.name}/${currentRealm.slug}/professions`} />;
    }

    private setTitle() {
        const { currentRegion, currentRealm } = this.props;

        if (currentRegion === null || currentRealm === null) {
            return;
        }

        setTitle(`Redirecting to Professions - ${currentRegion.name.toUpperCase()} ${currentRealm.name}`);
    }
}
