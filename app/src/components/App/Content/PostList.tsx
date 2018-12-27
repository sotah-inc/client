import * as React from "react";

import { Button, Card, Classes, H2, H5, Intent, Spinner } from "@blueprintjs/core";
import * as moment from "moment";
import * as ReactMarkdown from "react-markdown";
import { RouteComponentProps } from "react-router-dom";

import { IPostJson } from "@app/api-types/entities";
import { FetchLevel } from "@app/types/main";

export interface IDispatchProps {
    refreshPosts: () => void;
}

export interface IStateProps {
    posts: IPostJson[];
    getPostsLevel: FetchLevel;
}

export interface IOwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<IDispatchProps & IStateProps & IOwnProps>;

export class PostList extends React.Component<Props> {
    public componentDidMount() {
        const { getPostsLevel, refreshPosts } = this.props;

        switch (getPostsLevel) {
            case FetchLevel.initial:
                refreshPosts();

                return;
            default:
                return;
        }
    }

    public componentDidUpdate() {
        const { getPostsLevel, refreshPosts } = this.props;

        switch (getPostsLevel) {
            case FetchLevel.initial:
                refreshPosts();

                return;
            default:
                return;
        }
    }

    public render() {
        return (
            <>
                <div style={{ display: "flex" }}>
                    <H2 style={{ margin: 0 }}>Latest News</H2>
                    {this.renderLoadingSpinner()}
                </div>
                {this.renderContent()}
            </>
        );
    }

    private renderContent() {
        const { getPostsLevel } = this.props;

        switch (getPostsLevel) {
            case FetchLevel.success:
                return this.renderPosts();
            default:
                return this.renderSkeleton();
        }
    }

    private renderPosts() {
        const { posts } = this.props;

        return posts.map((v, i) => this.renderPost(i, v));
    }

    private renderPost(index: number, post: IPostJson) {
        const createdAt = new Date(post.createdAt * 1000);

        return (
            <Card key={index} style={{ marginTop: "10px" }} interactive={true} onClick={() => this.browseToPost(post)}>
                <H5>
                    <a onClick={() => this.browseToPost(post)}>{post.title}</a>
                    <small style={{ marginLeft: "5px" }}>
                        <em>submitted {moment(createdAt).format("MMM Do YYYY")}</em>
                    </small>
                </H5>
                <ReactMarkdown source={post.body} />
                <Button onClick={() => this.browseToPost(post)} text="Read More" />
            </Card>
        );
    }

    private browseToPost(post: IPostJson) {
        const { history } = this.props;

        history.push(`/content/news/${post.slug}`);
    }

    private renderLoadingSpinner() {
        const { getPostsLevel } = this.props;

        switch (getPostsLevel) {
            case FetchLevel.success:
                return null;
            case FetchLevel.failure:
                return (
                    <div style={{ marginLeft: "10px", paddingTop: "7px" }}>
                        <Spinner size={20} intent={Intent.DANGER} value={1} />
                    </div>
                );
            case FetchLevel.fetching:
                return (
                    <div style={{ marginLeft: "10px", paddingTop: "7px" }}>
                        <Spinner size={20} intent={Intent.PRIMARY} />
                    </div>
                );
            case FetchLevel.initial:
            default:
                return (
                    <div style={{ marginLeft: "10px", paddingTop: "7px" }}>
                        <Spinner size={20} intent={Intent.NONE} value={0} />
                    </div>
                );
        }
    }

    private renderSkeleton() {
        const numbers: number[] = Array.apply(null, Array(2)).map((_, i: number) => i);

        return numbers.map((_, i) => this.renderSkeletonItem(i));
    }

    private renderSkeletonItem(index: number) {
        return (
            <Card style={{ marginTop: "10px" }} key={index}>
                <H5 className={Classes.SKELETON}>
                    <a href="#">Lorem ipsum</a>
                </H5>
                <p className={Classes.SKELETON}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis vitae nunc in
                    tincidunt. Cras dapibus posuere ex, eget laoreet ligula ornare nec. Class aptent taciti sociosqu ad
                    litora torquent per conubia nostra, per inceptos himenaeos. Phasellus nec justo magna. Aenean
                    eleifend sem urna, ut dignissim lectus euismod quis. Proin pretium dignissim lacus, eu rhoncus lacus
                    dignissim quis. Praesent nec diam nisl. Donec sit amet metus ut ligula tempus pulvinar. Nulla
                    sodales, eros vel consequat aliquet, quam risus tempus nulla, rutrum cursus tellus ante eget diam.
                    In iaculis laoreet nisi, sed tincidunt nunc facilisis nec. Suspendisse id tellus nec nibh vulputate
                    pharetra. Maecenas auctor fringilla ex in ultrices. Cras leo tellus, convallis sed iaculis a,
                    convallis eu nulla. Aenean id nibh odio. Ut convallis erat a diam lacinia volutpat. Mauris luctus
                    tincidunt tortor eu volutpat.
                </p>
                <Button className={Classes.SKELETON} text="Read More" />
            </Card>
        );
    }
}
