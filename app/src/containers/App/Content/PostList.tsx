import { connect } from "react-redux";

import { ChangeIsDeletePostDialogOpen, FetchGetPosts } from "@app/actions/posts";
import { IDispatchProps, IStateProps, PostList } from "@app/components/App/Content/PostList";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile } = state.Main;
    const { posts, getPostsLevel } = state.Posts;
    const user = profile === null ? null : profile.user;

    return { getPostsLevel, posts, user };
};

const mapDispatchToProps: IDispatchProps = {
    changeIsDeletePostDialogOpen: ChangeIsDeletePostDialogOpen,
    refreshPosts: FetchGetPosts,
};

export const PostListContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(PostList);
