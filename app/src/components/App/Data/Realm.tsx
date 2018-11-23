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
            match: {
                params: { region_name, realm_slug },
            },
        } = this.props;

        return (
            <RealmRouteParserContainer region_name={region_name} realm_slug={realm_slug}>
                {this.renderRedirect()}
            </RealmRouteParserContainer>
        );
    }

    private renderRedirect() {
        const { currentRegion, currentRealm } = this.props;

        if (currentRegion === null || currentRealm === null) {
            return (
                <NonIdealState
                    title="Loading region and realm"
                    icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} value={0} />}
                />
            );
        }

        return <Redirect to={`/data/${currentRegion.name}/${currentRealm.slug}/auctions`} />;
    }
}
