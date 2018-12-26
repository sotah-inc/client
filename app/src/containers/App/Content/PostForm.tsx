import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchCreatePost } from "@app/actions/posts";
import { ICreatePostRequest } from "@app/api-types/contracts/user/post-crud";
import { IDispatchProps, IOwnProps, IStateProps } from "@app/components/App/Content/PostForm";
import { PostFormFormContainer } from "@app/form-containers/App/Content/PostForm";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile } = state.Main;
    const { createPostLevel } = state.Posts;

    return { createPostLevel, profile };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        createPost: (token: string, v: ICreatePostRequest) => dispatch(FetchCreatePost(token, v)),
    };
};

export const PostFormContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(PostFormFormContainer);
