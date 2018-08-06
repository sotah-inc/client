import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangeIsAddEntryDialogOpen } from "@app/actions/price-lists";
import { IDispatchProps, IOwnProps, IStateProps, PriceListPanel } from "@app/components/App/PriceLists/PriceListPanel";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRegion, currentRealm } = state.Main;
    const { isAddEntryDialogOpen } = state.PriceLists;
    return { currentRegion, currentRealm, isAddEntryDialogOpen };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddEntryDialogOpen(isDialogOpen)),
    };
};

export const PriceListPanelContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(PriceListPanel);
