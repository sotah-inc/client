import * as React from "react";

import { Breadcrumbs, Classes, H2, IBreadcrumbProps, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

import { ICreatePostRequest } from "@app/api-types/contracts/user/post-crud";
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
        const { profile, createPost, createPostLevel, createPostErrors, history, currentPost } = this.props;

        if (profile === null || profile.user.level < UserLevel.Admin) {
            return (
                <NonIdealState
                    title="Unauthorized."
                    icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={1} />}
                />
            );
        }

        return (
            <>
                <H2>News Creator</H2>
                {this.renderBreadcrumbs()}
                <PostFormFormContainer
                    mutatePostLevel={createPostLevel}
                    mutatePostErrors={createPostErrors}
                    onSubmit={(v: IFormValues) => createPost(profile.token, v)}
                    onComplete={() => {
                        if (currentPost === null) {
                            return;
                        }

                        AppToaster.show({
                            icon: "info-sign",
                            intent: "success",
                            message: "Your post has successfully been created!",
                        });

                        history.push(`/content/news/${currentPost.slug}`);
                    }}
                    onFatalError={err => {
                        AppToaster.show({
                            icon: "warning-sign",
                            intent: "danger",
                            message: `Could not create post: ${err}`,
                        });
                    }}
                />
            </>
        );
    }

    private renderBreadcrumbs() {
        const { history } = this.props;

        const breadcrumbs: IBreadcrumbProps[] = [
            {
                href: "/",
                onClick: (e: React.MouseEvent<HTMLElement>) => {
                    e.preventDefault();

                    history.push("/");
                },
                text: "Home",
            },
            {
                href: "/content/news",
                onClick: (e: React.MouseEvent<HTMLElement>) => {
                    e.preventDefault();

                    history.push("/content/news");
                },
                text: "News",
            },
            {
                text: "News Creator",
            },
        ];

        return (
            <div style={{ marginBottom: "10px" }}>
                <Breadcrumbs items={breadcrumbs} />
            </div>
        );
    }
}
