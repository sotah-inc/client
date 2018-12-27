import { connect } from "react-redux";

import { IStateProps, PostList } from "@app/components/App/Content/PostList";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { posts } = state.Posts;

    return { posts };
};

export const PostListContainer = connect<IStateProps>(mapStateToProps)(PostList);
