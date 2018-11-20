import * as React from "react";

import { H1 } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

import { IRegions } from "@app/types/global";

export interface IStateProps {
    regions: IRegions;
}

interface IRouteParams {
    region_name: string;
}

export interface IOwnProps extends RouteComponentProps<IRouteParams> {}

export type Props = Readonly<IOwnProps & IStateProps>;

export class Region extends React.Component<Props> {
    public render() {
        const {
            regions,
            match: {
                params: { region_name },
            },
        } = this.props;

        if (!(region_name in regions)) {
            return <H1>FOUR OH FOUR!</H1>;
        }

        const region = regions[region_name];

        return <H1>{region.name}</H1>;
    }
}
