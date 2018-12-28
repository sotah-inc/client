import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangePost } from "@app/actions/posts";
import { IPostJson } from "@app/api-types/entities";
import { IDispatchProps, IOwnProps, IStateProps, Post } from "@app/components/App/Content/Post";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { posts, currentPost } = state.Posts;

    return { currentPost, posts };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changePost: (v: IPostJson) => dispatch(ChangePost(v)),
    };
};

export const PostContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Post);
