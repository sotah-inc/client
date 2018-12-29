import { connect } from "react-redux";

import { IOwnProps, IStateProps } from "@app/components/App/Content/PostForm";
import { PostFormFormContainer } from "@app/form-containers/App/Content/PostForm";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentPost } = state.Posts;

    return { currentPost };
};

export const PostFormContainer = connect<IStateProps, IOwnProps>(mapStateToProps)(PostFormFormContainer);
