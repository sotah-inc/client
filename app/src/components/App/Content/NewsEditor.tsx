import * as React from "react";

import { Classes, H2, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

import { IUpdatePostRequest } from "@app/api-types/contracts/user/post-crud";
import { IPostJson, UserLevel } from "@app/api-types/entities";
import { IFormValues } from "@app/components/App/Content/PostForm";
import { PostFormFormContainer } from "@app/form-containers/App/Content/PostForm";
import { IProfile } from "@app/types/global";
import { FetchLevel } from "@app/types/main";
import { AppToaster } from "@app/util/toasters";

export interface IStateProps {
    profile: IProfile | null;
    currentPost: IPostJson | null;
    updatePostLevel: FetchLevel;
    updatePostErrors: {
        [key: string]: string;
    };
    getPostLevel: FetchLevel;
}

export interface IDispatchProps {
    getPost: (slug: string) => void;
    changePost: (v: IPostJson) => void;
    updatePost: (token: string, postId: number, v: IUpdatePostRequest) => void;
}

interface IRouteParams {
    post_slug?: string;
}

export interface IOwnProps extends RouteComponentProps<IRouteParams> {}

type Props = Readonly<IDispatchProps & IStateProps & IOwnProps>;

export class NewsEditor extends React.Component<Props> {
    public componentDidMount() {
        this.handle();
    }

    public componentDidUpdate(prevProps: Props) {
        this.handle(prevProps);
    }

    public render() {
        const {
            match: {
                params: { post_slug },
            },
            profile,
            updatePost,
            updatePostLevel,
            history,
            currentPost,
            updatePostErrors,
            getPostLevel,
        } = this.props;

        if (profile === null || profile.user.level < UserLevel.Admin) {
            return (
                <NonIdealState
                    title="Unauthorized."
                    icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={1} />}
                />
            );
        }

        switch (getPostLevel) {
            case FetchLevel.success:
                if (currentPost !== null && typeof post_slug !== "undefined" && currentPost.slug === post_slug) {
                    break;
                }

                return (
                    <NonIdealState
                        title="Switching to new post."
                        icon={<Spinner className={Classes.LARGE} intent={Intent.PRIMARY} />}
                    />
                );
            case FetchLevel.fetching:
                return (
                    <NonIdealState
                        title="Loading post."
                        icon={<Spinner className={Classes.LARGE} intent={Intent.PRIMARY} />}
                    />
                );
            case FetchLevel.failure:
                return (
                    <NonIdealState
                        title="Failed to load post."
                        icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={1} />}
                    />
                );
            default:
            case FetchLevel.initial:
                return (
                    <NonIdealState
                        title="Loading post."
                        icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} value={0} />}
                    />
                );
        }

        return (
            <>
                <H2>News Editor</H2>
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
            </>
        );
    }

    private handle(prevProps?: Props) {
        const {
            match: {
                params: { post_slug },
            },
            changePost,
            currentPost,
            getPost,
            getPostLevel,
        } = this.props;

        if (typeof post_slug === "undefined") {
            return;
        }

        switch (getPostLevel) {
            case FetchLevel.initial:
                getPost(post_slug);

                return;
            case FetchLevel.failure:
                if (typeof prevProps !== "undefined" && prevProps.getPostLevel !== getPostLevel) {
                    AppToaster.show({
                        icon: "warning-sign",
                        intent: "danger",
                        message: "Could not fetch post.",
                    });

                    return;
                }

                if (currentPost === null || currentPost.slug !== post_slug) {
                    getPost(post_slug);

                    return;
                }

                return;
            case FetchLevel.success:
                if (currentPost !== null) {
                    if (currentPost.slug !== post_slug) {
                        getPost(post_slug);

                        return;
                    }

                    changePost(currentPost);

                    return;
                }

                return;
            default:
                return;
        }
    }
}
