import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangeIsDeletePostDialogOpen, FetchDeletePost, IDeletePostOptions } from "@app/actions/posts";
import { DeletePostDialog, IDispatchProps, IStateProps } from "@app/components/App/Content/DeletePostDialog";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile } = state.Main;
    const { deletePostLevel, isDeletePostDialogOpen, currentPost } = state.Posts;

    return {
        currentPost,
        deletePostLevel,
        isDeletePostDialogOpen,
        profile,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeIsDeletePostDialogOpen: (v: IDeletePostOptions) => dispatch(ChangeIsDeletePostDialogOpen(v)),
        deletePost: (token: string, id: number) => dispatch(FetchDeletePost(token, id)),
    };
};

export const DeletePostDialogContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(DeletePostDialog);
