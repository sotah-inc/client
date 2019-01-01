import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangeIsDeletePostDialogOpen, ChangePost, FetchGetPost, IDeletePostOptions } from "@app/actions/posts";
import { IPostJson } from "@app/api-types/entities";
import { IDispatchProps, IOwnProps, IStateProps, Post } from "@app/components/App/Content/Post";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile } = state.Main;
    const { currentPost, getPostLevel } = state.Posts;
    const user = profile === null ? null : profile.user;

    return { currentPost, getPostLevel, user };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeIsDeletePostDialogOpen: (v: IDeletePostOptions) => dispatch(ChangeIsDeletePostDialogOpen(v)),
        changePost: (v: IPostJson) => dispatch(ChangePost(v)),
        getPost: (slug: string) => dispatch(FetchGetPost(slug)),
    };
};

export const PostContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Post);
