import { connect } from "react-redux";

import { IStateProps, TreeContent } from "@app/components/App/PriceLists/PricelistTree/TreeContent";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRealm, currentRegion } = state.Main;
    const { selectedList } = state.PriceLists;
    return { currentRealm, selectedList, currentRegion };
};

export const TreeContentContainer = connect<IStateProps>(mapStateToProps)(TreeContent);
