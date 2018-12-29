import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchCreatePost } from "@app/actions/posts";
import { ICreatePostRequest } from "@app/api-types/contracts/user/post-crud";
import { IDispatchProps, IOwnProps, IStateProps, NewsCreator } from "@app/components/App/Content/NewsCreator";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile } = state.Main;

    return { profile };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        createPost: (token: string, v: ICreatePostRequest) => dispatch(FetchCreatePost(token, v)),
    };
};

export const NewsCreatorContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(NewsCreator);
