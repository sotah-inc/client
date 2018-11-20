import { connect } from "react-redux";

import { IOwnProps, IStateProps, Region } from "@app/components/App/Data/Region";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { regions } = state.Main;
    return { regions };
};

export const RegionContainer = connect<IStateProps, IOwnProps>(mapStateToProps)(Region);
