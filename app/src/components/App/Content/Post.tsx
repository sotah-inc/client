import * as React from "react";

import { RouteComponentProps } from "react-router-dom";

import { IPostJson } from "@app/api-types/entities";

export interface IStateProps {
    currentPost: IPostJson | null;
}

interface IRouteParams {
    post_slug?: string;
}

export interface IOwnProps extends RouteComponentProps<IRouteParams> {}

export type Props = Readonly<IStateProps & IOwnProps>;

export class Post extends React.Component<Props> {
    public render() {
        return <p>Hello, world!</p>;
    }
}
