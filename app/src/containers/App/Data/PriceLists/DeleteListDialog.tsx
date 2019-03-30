import { connect } from "react-redux";

import {
    ChangeIsDeleteListDialogOpen,
    FetchDeletePricelist,
    FetchDeleteProfessionPricelist,
} from "@app/actions/price-lists";
import { DeleteListDialog, IDispatchProps, IStateProps } from "@app/components/App/Data/PriceLists/DeleteListDialog";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile, currentRegion, currentRealm } = state.Main;
    const {
        selectedList,
        isDeleteListDialogOpen,
        deletePricelistLevel,
        selectedProfession,
        selectedExpansion,
    } = state.PriceLists;

    return {
        currentRealm,
        currentRegion,
        deletePricelistLevel,
        isDeleteListDialogOpen,
        profile,
        selectedExpansion,
        selectedList,
        selectedProfession,
    };
};

const mapDispatchToProps: IDispatchProps = {
    changeIsDeleteListDialogOpen: ChangeIsDeleteListDialogOpen,
    deletePricelist: FetchDeletePricelist,
    deleteProfessionPricelist: FetchDeleteProfessionPricelist,
};

export const DeleteListDialogContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(DeleteListDialog);
