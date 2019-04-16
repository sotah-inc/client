import * as React from "react";

import { Redirect, RouteComponentProps } from "react-router-dom";

import { setTitle } from "@app/util";

export interface IOwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<IOwnProps>;

export class Profile extends React.Component<Props> {
    public componentDidMount() {
        setTitle("Redirecting to Manage Account");
    }

    public render() {
        return <Redirect to="/profile/manage-account" />;
    }
}
