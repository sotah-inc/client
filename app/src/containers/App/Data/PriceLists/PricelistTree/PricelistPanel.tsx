import { connect } from "react-redux";

import { ChangeIsAddEntryDialogOpen } from "@app/actions/price-lists";
import {
    IDispatchProps,
    IOwnProps,
    IStateProps,
    PricelistPanel,
} from "@app/components/App/Data/PriceLists/PricelistTree/PricelistPanel";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRegion, currentRealm } = state.Main;
    const { isAddEntryDialogOpen } = state.PriceLists;
    return { currentRegion, currentRealm, isAddEntryDialogOpen };
};

const mapDispatchToProps: IDispatchProps = {
    changeIsAddEntryDialogOpen: ChangeIsAddEntryDialogOpen,
};

export const PricelistPanelContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(PricelistPanel);
