import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangePost, FetchGetPost, FetchUpdatePost } from "@app/actions/posts";
import { ICreatePostRequest } from "@app/api-types/contracts/user/post-crud";
import { IPostJson } from "@app/api-types/entities";
import { IDispatchProps, IOwnProps, IStateProps, NewsEditor } from "@app/components/App/Content/NewsEditor";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile } = state.Main;
    const { currentPost, updatePostErrors, updatePostLevel, getPostLevel } = state.Posts;

    return { currentPost, getPostLevel, profile, updatePostErrors, updatePostLevel };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changePost: (v: IPostJson) => dispatch(ChangePost(v)),
        getPost: (slug: string) => dispatch(FetchGetPost(slug)),
        updatePost: (token: string, id: number, v: ICreatePostRequest) => dispatch(FetchUpdatePost(token, id, v)),
    };
};

export const NewsEditorContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(NewsEditor);
