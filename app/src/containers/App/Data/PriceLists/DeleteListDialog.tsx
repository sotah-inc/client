import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
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

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeIsDeleteListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsDeleteListDialogOpen(isDialogOpen)),
        deletePricelist: (token: string, id: number) => dispatch(FetchDeletePricelist(token, id)),
        deleteProfessionPricelist: (token: string, id: number) => dispatch(FetchDeleteProfessionPricelist(token, id)),
    };
};

export const DeleteListDialogContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(DeleteListDialog);
