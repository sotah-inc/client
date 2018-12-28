import * as React from "react";

import { Classes, H1, Icon, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router-dom";

import { IPostJson } from "@app/api-types/entities";

export interface IStateProps {
    posts: IPostJson[];
    currentPost: IPostJson | null;
}

export interface IDispatchProps {
    changePost: (v: IPostJson) => void;
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
        } = this.props;

        if (typeof post_slug === "undefined") {
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
            posts,
            currentPost,
            changePost,
        } = this.props;

        if (typeof post_slug === "undefined") {
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
