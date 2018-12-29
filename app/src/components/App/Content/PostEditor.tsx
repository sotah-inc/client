import * as React from "react";

import { RouteComponentProps } from "react-router-dom";

import { IPostJson, IUserJson, UserLevel } from "@app/api-types/entities";
import { PostFormRouteContainer } from "@app/route-containers/App/Content/PostForm";
import { Classes, Intent, NonIdealState, Spinner } from "@blueprintjs/core";

export interface IStateProps {
    currentPost: IPostJson | null;
    user: IUserJson | null;
}

interface IRouteParams {
    post_slug?: string;
}

export interface IOwnProps extends RouteComponentProps<IRouteParams> {}

export type Props = Readonly<IStateProps & IOwnProps>;

export class PostEditor extends React.Component<Props> {
    public render() {
        const { user } = this.props;

        if (user === null || user.level < UserLevel.Admin) {
            return (
                <NonIdealState
                    title="Unauthorized."
                    icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={1} />}
                />
            );
        }

        return <PostFormRouteContainer onComplete={v => console.log(v)} />;
    }
}
