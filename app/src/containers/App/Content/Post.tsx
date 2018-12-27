import { connect } from "react-redux";

import { IOwnProps, IStateProps, Post } from "@app/components/App/Content/Post";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentPost } = state.Posts;

    return { currentPost };
};

export const PostContainer = connect<IStateProps, IOwnProps>(mapStateToProps)(Post);
