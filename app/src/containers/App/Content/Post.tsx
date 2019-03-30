import { connect } from "react-redux";

import { ChangeIsDeletePostDialogOpen, ChangePost, FetchGetPost } from "@app/actions/posts";
import { IDispatchProps, IOwnProps, IStateProps, Post } from "@app/components/App/Content/Post";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile } = state.Main;
    const { currentPost, getPostLevel } = state.Posts;
    const user = profile === null ? null : profile.user;

    return { currentPost, getPostLevel, user };
};

const mapDispatchToProps: IDispatchProps = {
    changeIsDeletePostDialogOpen: ChangeIsDeletePostDialogOpen,
    changePost: ChangePost,
    getPost: FetchGetPost,
};

export const PostContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Post);
