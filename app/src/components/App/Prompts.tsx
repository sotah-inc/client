import * as React from "react";

import { RouteComponentProps } from "react-router-dom";

import { IUserJson } from "@app/api-types/entities";

export interface IStateProps {
    user: IUserJson | null;
}

export interface IDispatchProps {
    hello: () => void;
}

export interface IOwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<IStateProps & IDispatchProps & IOwnProps>;

export class Prompts extends React.Component<Props> {
    public render() {
        return <p>Hello, world</p>;
    }
}
