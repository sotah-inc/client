import { connect } from "react-redux";

import { AppendItems, ChangeIsEditListDialogOpen, FetchUpdatePricelist } from "@app/actions/price-lists";
import { EditListDialog, IDispatchProps, IStateProps } from "@app/components/App/Data/PriceLists/EditListDialog";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile, currentRegion, currentRealm } = state.Main;
    const {
        isEditListDialogOpen,
        items,
        updatePricelistLevel,
        updatePricelistErrors,
        selectedList,
        selectedExpansion,
        selectedProfession,
    } = state.PriceLists;

    return {
        currentRealm,
        currentRegion,
        isEditListDialogOpen,
        items,
        profile,
        selectedExpansion,
        selectedList,
        selectedProfession,
        updatePricelistErrors,
        updatePricelistLevel,
    };
};

const mapDispatchToProps: IDispatchProps = {
    appendItems: AppendItems,
    changeIsEditListDialogOpen: ChangeIsEditListDialogOpen,
    updatePricelist: FetchUpdatePricelist,
};

export const EditListDialogContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(EditListDialog);
