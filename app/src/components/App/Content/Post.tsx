import * as React from "react";

import { Classes, H1, Icon, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

import { IPostJson } from "@app/api-types/entities";
import { FetchLevel } from "@app/types/main";

export interface IStateProps {
    posts: IPostJson[];
    currentPost: IPostJson | null;
    getPostsLevel: FetchLevel;
}

export interface IDispatchProps {
    changePost: (v: IPostJson) => void;
    refreshPosts: () => void;
}

interface IRouteParams {
    post_slug?: string;
}

export interface IOwnProps extends RouteComponentProps<IRouteParams> {}

export type Props = Readonly<IDispatchProps & IStateProps & IOwnProps>;

export class Post extends React.Component<Props> {
    public componentDidMount() {
        const {
            match: {
                params: { post_slug },
            },
            posts,
            currentPost,
            changePost,
            getPostsLevel,
            refreshPosts,
        } = this.props;

        if (typeof post_slug === "undefined") {
            return;
        }

        switch (getPostsLevel) {
            case FetchLevel.initial:
                refreshPosts();

                return;
            case FetchLevel.success:
                break;
            default:
                return;
        }

        const foundPost: IPostJson | null = posts.reduce((pv, v) => {
            if (pv !== null) {
                return pv;
            }

            if (v.slug === post_slug) {
                return v;
            }

            return null;
        }, null);
        if (foundPost === null) {
            return;
        }

        if (currentPost === null || currentPost.slug !== foundPost.slug) {
            changePost(foundPost);

            return;
        }
    }

    public componentDidUpdate() {
        const {
            match: {
                params: { post_slug },
            },
            getPostsLevel,
            posts,
            currentPost,
            changePost,
            refreshPosts,
        } = this.props;

        if (typeof post_slug === "undefined") {
            return;
        }

        switch (getPostsLevel) {
            case FetchLevel.initial:
                refreshPosts();

                return;
            case FetchLevel.success:
                break;
            default:
                return;
        }

        const foundPost: IPostJson | null = posts.reduce((pv, v) => {
            if (pv !== null) {
                return pv;
            }

            if (v.slug === post_slug) {
                return v;
            }

            return null;
        }, null);
        if (foundPost === null) {
            return;
        }

        if (currentPost === null || currentPost.slug !== foundPost.slug) {
            changePost(foundPost);

            return;
        }
    }

    public render() {
        return (
            <>
                <H1>
                    <Icon icon="globe" iconSize={35} /> Secrets of the Auction House
                </H1>
                {this.renderContent()}
            </>
        );
    }

    private renderContent() {
        const {
            match: {
                params: { post_slug },
            },
            getPostsLevel,
            currentPost,
        } = this.props;

        if (typeof post_slug === "undefined") {
            return (
                <NonIdealState
                    title="News post not found"
                    icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} value={1} />}
                />
            );
        }

        switch (getPostsLevel) {
            case FetchLevel.success:
                break;
            case FetchLevel.failure:
                return (
                    <NonIdealState
                        title="Failed to fetch news posts"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={1} />}
                    />
                );
            case FetchLevel.fetching:
                return (
                    <NonIdealState
                        title="Loading news posts"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.PRIMARY} />}
                    />
                );
            case FetchLevel.initial:
            default:
                return (
                    <NonIdealState
                        title="Loading news posts"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} value={0} />}
                    />
                );
        }

        if (currentPost === null) {
            return (
                <NonIdealState
                    title="Loading news post"
                    icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} value={0} />}
                />
            );
        }

        if (currentPost.slug !== post_slug) {
            return (
                <NonIdealState
                    title="Changing news post"
                    icon={<Spinner className={Classes.LARGE} intent={Intent.PRIMARY} />}
                />
            );
        }

        return <p>Hello, world!</p>;
    }
}
