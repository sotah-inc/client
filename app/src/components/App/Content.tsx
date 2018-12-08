import * as React from "react";

import { Redirect, RouteComponentProps } from "react-router-dom";

import { setTitle } from "@app/util";

export interface IOwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<IOwnProps>;

export class Content extends React.Component<Props> {
    public componentDidMount() {
        setTitle("Redirecting to News");
    }

    public render() {
        return <Redirect to="/content/news" />;
    }
}
