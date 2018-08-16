import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import {
    ChangeIsDeleteListDialogOpen,
    FetchDeletePricelist,
    FetchDeleteProfessionPricelist,
} from "@app/actions/price-lists";
import { IDeletePricelistRequestOptions, IDeleteProfessionPricelistRequestOptions } from "@app/api/price-lists";
import { DeleteListDialog, IDispatchProps, IStateProps } from "@app/components/App/PriceLists/DeleteListDialog";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile } = state.Main;
    const { selectedList, isDeleteListDialogOpen, deletePricelistLevel, selectedProfession } = state.PriceLists;
    return {
        deletePricelistLevel,
        isDeleteListDialogOpen,
        profile,
        selectedList,
        selectedProfession,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeIsDeleteListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsDeleteListDialogOpen(isDialogOpen)),
        deletePricelist: (opts: IDeletePricelistRequestOptions) => dispatch(FetchDeletePricelist(opts)),
        deleteProfessionPricelist: (opts: IDeleteProfessionPricelistRequestOptions) =>
            dispatch(FetchDeleteProfessionPricelist(opts)),
    };
};

export const DeleteListDialogContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(DeleteListDialog);
