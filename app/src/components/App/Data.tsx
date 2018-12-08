import * as React from "react";

import { Redirect } from "react-router-dom";

import { IRegion } from "@app/api-types/region";

export interface IStateProps {
    currentRegion: IRegion | null;
}

export type Props = Readonly<IStateProps>;

export class Data extends React.Component<Props> {
    public render() {
        const { currentRegion } = this.props;

        if (currentRegion === null) {
            return null;
        }

        return <Redirect to={`/data/${currentRegion.name}`} />;
    }
}
