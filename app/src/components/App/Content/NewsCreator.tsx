import * as React from "react";

import { Classes, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

import { ICreatePostRequest } from "@app/api-types/contracts/user/post-crud";
import { UserLevel } from "@app/api-types/entities";
import { IFormValues } from "@app/components/App/Content/PostForm";
import { PostFormRouteContainer } from "@app/route-containers/App/Content/PostForm";
import { IProfile } from "@app/types/global";
import { FetchLevel } from "@app/types/main";
import { setTitle } from "@app/util";

export interface IStateProps {
    profile: IProfile | null;
    createPostLevel: FetchLevel;
    createPostErrors: {
        [key: string]: string;
    };
}

export interface IDispatchProps {
    createPost: (token: string, v: ICreatePostRequest) => void;
}

export interface IOwnProps extends RouteComponentProps<{}> {}

type Props = Readonly<IDispatchProps & IStateProps & IOwnProps>;

export class NewsCreator extends React.Component<Props> {
    public componentDidMount() {
        setTitle("News Creator");
    }

    public render() {
        const { profile, createPost, createPostLevel, createPostErrors } = this.props;

        if (profile === null || profile.user.level < UserLevel.Admin) {
            return (
                <NonIdealState
                    title="Unauthorized."
                    icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={1} />}
                />
            );
        }

        return (
            <PostFormRouteContainer
                mutatePostLevel={createPostLevel}
                mutatePostErrors={createPostErrors}
                onSubmit={(v: IFormValues) => createPost(profile.token, v)}
            />
        );
    }
}
