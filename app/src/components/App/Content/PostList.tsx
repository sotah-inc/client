import * as React from "react";

import { IPostJson } from "@app/api-types/entities";

export interface IStateProps {
    posts: IPostJson[];
}

export type Props = Readonly<IStateProps>;

export class PostList extends React.Component<Props> {
    public render() {
        return <p>Hello, world!</p>;
    }
}
