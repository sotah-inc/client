import { connect } from "react-redux";

import { IOwnProps, IStateProps, NewsCreator } from "@app/components/App/Content/NewsCreator";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile } = state.Main;
    const user = profile === null ? null : profile.user;

    return { user };
};

export const NewsCreatorContainer = connect<IStateProps, IOwnProps>(mapStateToProps)(NewsCreator);
