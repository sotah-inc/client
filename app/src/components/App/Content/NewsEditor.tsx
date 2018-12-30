import * as React from "react";

import { Classes, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

import { IUpdatePostRequest } from "@app/api-types/contracts/user/post-crud";
import { IPostJson, UserLevel } from "@app/api-types/entities";
import { IFormValues } from "@app/components/App/Content/PostForm";
import { PostFormFormContainer } from "@app/form-containers/App/Content/PostForm";
import { IProfile } from "@app/types/global";
import { FetchLevel } from "@app/types/main";
import { setTitle } from "@app/util";
import { AppToaster } from "@app/util/toasters";

export interface IStateProps {
    profile: IProfile | null;
    currentPost: IPostJson | null;
    updatePostLevel: FetchLevel;
    updatePostErrors: {
        [key: string]: string;
    };
}

export interface IDispatchProps {
    updatePost: (token: string, postId: number, v: IUpdatePostRequest) => void;
}

export interface IOwnProps extends RouteComponentProps<{}> {}

type Props = Readonly<IDispatchProps & IStateProps & IOwnProps>;

export class NewsEditor extends React.Component<Props> {
    public componentDidMount() {
        setTitle("News Creator");
    }

    public render() {
        const { profile, updatePost, updatePostLevel, history, currentPost, updatePostErrors } = this.props;

        if (profile === null || profile.user.level < UserLevel.Admin) {
            return (
                <NonIdealState
                    title="Unauthorized."
                    icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={1} />}
                />
            );
        }

        if (currentPost === null) {
            return null;
        }

        return (
            <PostFormFormContainer
                mutatePostLevel={updatePostLevel}
                mutatePostErrors={updatePostErrors}
                defaultFormValues={currentPost}
                onSubmit={(v: IFormValues) => updatePost(profile.token, currentPost.id, v)}
                onComplete={() => {
                    if (currentPost === null) {
                        return;
                    }

                    AppToaster.show({
                        icon: "info-sign",
                        intent: "success",
                        message: "Your post has successfully been updated!",
                    });

                    history.push(`/content/news/${currentPost.slug}`);
                }}
                onFatalError={err => {
                    AppToaster.show({
                        icon: "warning-sign",
                        intent: "danger",
                        message: `Could not update post: ${err}`,
                    });
                }}
            />
        );
    }
}
