import { connect } from "react-redux";

import { IOwnProps, IStateProps, News } from "@app/components/App/Content/News";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRegion } = state.Main;
    return { currentRegion };
};

export const NewsContainer = connect<IStateProps, IOwnProps>(mapStateToProps)(News);
