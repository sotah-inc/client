import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangePost, FetchGetPost } from "@app/actions/posts";
import { IPostJson } from "@app/api-types/entities";
import { IDispatchProps, IOwnProps, IStateProps, Post } from "@app/components/App/Content/Post";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentPost, getPostLevel } = state.Posts;

    return { currentPost, getPostLevel };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changePost: (v: IPostJson) => dispatch(ChangePost(v)),
        getPost: (slug: string) => dispatch(FetchGetPost(slug)),
    };
};

export const PostContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Post);
