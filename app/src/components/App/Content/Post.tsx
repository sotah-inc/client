import * as React from "react";

import {
    Button,
    ButtonGroup,
    Card,
    Classes,
    H1,
    H2,
    H5,
    Icon,
    Intent,
    NonIdealState,
    Spinner,
} from "@blueprintjs/core";
import * as moment from "moment";
import { RouteComponentProps } from "react-router-dom";

import { IPostJson, IUserJson, UserLevel } from "@app/api-types/entities";
import { MarkdownRenderer } from "@app/components/util";
import { FetchLevel } from "@app/types/main";
import { setTitle } from "@app/util";

export interface IStateProps {
    currentPost: IPostJson | null;
    getPostLevel: FetchLevel;
    user: IUserJson | null;
}

export interface IDispatchProps {
    changePost: (v: IPostJson) => void;
    getPost: (slug: string) => void;
}

interface IRouteParams {
    post_slug?: string;
}

export interface IOwnProps extends RouteComponentProps<IRouteParams> {}

export type Props = Readonly<IDispatchProps & IStateProps & IOwnProps>;

export class Post extends React.Component<Props> {
    public componentDidMount() {
        this.handle();
    }

    public componentDidUpdate(prevProps: Props) {
        this.handle(prevProps);
    }

    public render() {
        return (
            <>
                <div className="pure-g">
                    <div className="pure-u-3-4">
                        <H1>
                            <Icon icon="globe" iconSize={35} /> Secrets of the Auction House
                        </H1>
                        {this.renderContent()}
                    </div>
                </div>
                <div className="pure-u-1-4">&nbsp;</div>
            </>
        );
    }

    private handle(prevProps?: Props) {
        const {
            match: {
                params: { post_slug },
            },
            getPostLevel,
            getPost,
            currentPost,
        } = this.props;

        if (typeof post_slug === "undefined") {
            return;
        }

        switch (getPostLevel) {
            case FetchLevel.success:
                if (currentPost !== null && currentPost.slug !== post_slug) {
                    getPost(post_slug);

                    return;
                }

                if (currentPost === null) {
                    return;
                }

                break;
            case FetchLevel.failure:
                if (typeof prevProps !== "undefined" && prevProps.getPostLevel === FetchLevel.fetching) {
                    return;
                }

                if (currentPost === null || currentPost.slug !== post_slug) {
                    getPost(post_slug);

                    return;
                }

                return;
            case FetchLevel.initial:
                getPost(post_slug);

                return;
            default:
                return;
        }

        setTitle(`${currentPost.title} - News`);
    }

    private renderContent() {
        const {
            match: {
                params: { post_slug },
            },
            getPostLevel,
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

        switch (getPostLevel) {
            case FetchLevel.success:
                break;
            case FetchLevel.failure:
                return (
                    <NonIdealState
                        title="Failed to fetch news post"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={1} />}
                    />
                );
            case FetchLevel.fetching:
                return (
                    <NonIdealState
                        title="Loading news post"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.PRIMARY} />}
                    />
                );
            case FetchLevel.initial:
            default:
                return (
                    <NonIdealState
                        title="Loading news post"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} value={0} />}
                    />
                );
        }

        if (currentPost === null) {
            return (
                <NonIdealState
                    title="Loading news post"
                    icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} />}
                />
            );
        }

        if (currentPost.slug !== post_slug) {
            return (
                <NonIdealState
                    title="Changing news post"
                    description={`Browsing to ${post_slug}`}
                    icon={<Spinner className={Classes.LARGE} intent={Intent.PRIMARY} />}
                />
            );
        }

        return (
            <Card elevation={3}>
                <H2>{currentPost.title}</H2>
                <H5>
                    <small>Submitted {moment(new Date(currentPost.createdAt * 1000)).format("MMM Do YYYY")}</small>
                </H5>
                {this.renderActionBar()}
                <hr />
                <MarkdownRenderer body={currentPost.body} />
            </Card>
        );
    }

    private renderActionBar() {
        const { user, currentPost, history } = this.props;

        if (user === null || user.level < UserLevel.Admin) {
            return null;
        }

        if (currentPost === null) {
            return null;
        }

        return (
            <>
                <hr />
                <ButtonGroup>
                    <Button
                        icon="edit"
                        text="Edit"
                        onClick={() => history.push(`/content/news/${currentPost.slug}/edit`)}
                    />
                    <Button icon="delete" onClick={() => console.log("wew lad")} />
                </ButtonGroup>
            </>
        );
    }
}
