import * as React from "react";

import { Classes, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import { Redirect, RouteComponentProps } from "react-router-dom";

import { IRegion } from "@app/api-types/region";
import { AuthLevel } from "@app/types/main";

export interface IStateProps {
    currentRegion: IRegion | null;
    authLevel: AuthLevel;
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
        throw new Error("wew lad");

        return null;
    }

    private renderBootUnauth() {
        const { currentRegion } = this.props;

        if (currentRegion === null) {
            return null;
        }

        return <Redirect to={`/data/${currentRegion.name}`} />;
    }
}
