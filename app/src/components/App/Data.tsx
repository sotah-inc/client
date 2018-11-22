import * as React from "react";

import { Classes, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import { Redirect, RouteComponentProps } from "react-router-dom";

import { IRegion } from "@app/api-types/region";
import { AuthLevel, FetchLevel } from "@app/types/main";

export interface IStateProps {
    currentRegion: IRegion | null;
    authLevel: AuthLevel;
    fetchUserPreferencesLevel: FetchLevel;
}

export interface IOwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<IOwnProps & IStateProps>;

export class Data extends React.Component<Props> {
    public render() {
        const { authLevel } = this.props;

        switch (authLevel) {
            case AuthLevel.authenticated:
                return this.renderBootAuth();
            case AuthLevel.unauthenticated:
                return this.renderBootUnauth();
            case AuthLevel.initial:
            default:
                return (
                    <NonIdealState
                        title="Loading"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} value={0} />}
                    />
                );
        }
    }

    private renderBootAuth() {
        const { fetchUserPreferencesLevel } = this.props;

        switch (fetchUserPreferencesLevel) {
            case FetchLevel.fetching:
            case FetchLevel.refetching:
            case FetchLevel.prompted:
                return (
                    <NonIdealState
                        title="Loading"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.PRIMARY} />}
                    />
                );
            case FetchLevel.success:
                return this.renderBootAuthWithPreferences();
            case FetchLevel.failure:
                return (
                    <NonIdealState
                        title="Failed to load user preferences."
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

    private renderBootAuthWithPreferences() {
        const { currentRegion } = this.props;

        if (currentRegion === null) {
            return (
                <NonIdealState
                    title="Loading"
                    icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} value={0} />}
                />
            );
        }

        return <Redirect to={`/data/${currentRegion.name}`} />;
    }

    private renderBootUnauth() {
        const { currentRegion } = this.props;

        if (currentRegion === null) {
            return null;
        }

        return <Redirect to={`/data/${currentRegion.name}`} />;
    }
}
