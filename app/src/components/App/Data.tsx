import * as React from "react";

import { Redirect, RouteComponentProps } from "react-router-dom";

import { IRealm, IRegion } from "@app/api-types/region";

export interface IStateProps {
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
}

export interface IOwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<IOwnProps & IStateProps>;

export class Data extends React.Component<Props> {
    public render() {
        const { currentRealm, currentRegion } = this.props;

        if (currentRegion === null || currentRealm === null) {
            return null;
        }

        return <Redirect to={`/data/auctions/${currentRegion.name}/${currentRealm.slug}`} />;
    }
}
