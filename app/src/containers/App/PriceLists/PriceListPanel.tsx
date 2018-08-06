import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangeIsAddEntryDialogOpen } from "@app/actions/price-lists";
import { DispatchProps, OwnProps, PriceListPanel, StateProps } from "@app/components/App/PriceLists/PriceListPanel";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): StateProps => {
    const { currentRegion, currentRealm } = state.Main;
    const { isAddEntryDialogOpen } = state.PriceLists;
    return { currentRegion, currentRealm, isAddEntryDialogOpen };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
    return {
        changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddEntryDialogOpen(isDialogOpen)),
    };
};

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(PriceListPanel);
