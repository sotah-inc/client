import * as React from "react";

import { Redirect, RouteComponentProps } from "react-router-dom";

export interface IOwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<IOwnProps>;

export class Content extends React.Component<Props> {
    public render() {
        document.title = "Redirecting to News - Sotah Client";

        return <Redirect to="/content/news" />;
    }
}
