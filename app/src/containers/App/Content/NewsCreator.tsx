import { connect } from "react-redux";

import { FetchCreatePost } from "@app/actions/posts";
import { IDispatchProps, IOwnProps, IStateProps, NewsCreator } from "@app/components/App/Content/NewsCreator";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile } = state.Main;
    const { createPostLevel, createPostErrors, currentPost } = state.Posts;

    return { createPostErrors, createPostLevel, currentPost, profile };
};

const mapDispatchToProps: IDispatchProps = {
    createPost: FetchCreatePost,
};

export const NewsCreatorContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(NewsCreator);
