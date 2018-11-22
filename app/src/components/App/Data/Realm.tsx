import * as React from "react";

import { Classes, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import { Redirect, RouteComponentProps } from "react-router-dom";

import { IRealm, IRegion } from "@app/api-types/region";
import { RealmRouteParserContainer } from "@app/containers/util/RealmRouteParser";

export interface IStateProps {
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
}

interface IRouteParams {
    region_name: string;
    realm_slug: string;
}

export interface IOwnProps extends RouteComponentProps<IRouteParams> {}

export type Props = Readonly<IOwnProps & IStateProps>;

export class Realm extends React.Component<Props> {
    public render() {
        const {
            currentRegion,
            currentRealm,
            match: {
                params: { region_name, realm_slug },
            },
        } = this.props;

        if (currentRegion === null || currentRealm === null) {
            return (
                <NonIdealState
                    title="Failure"
                    icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={1} />}
                />
            );
        }

        return (
            <RealmRouteParserContainer region_name={region_name} realm_slug={realm_slug}>
                <Redirect to={`/data/${currentRegion.name}/${currentRealm.slug}/auctions`} />
            </RealmRouteParserContainer>
        );
    }
}
