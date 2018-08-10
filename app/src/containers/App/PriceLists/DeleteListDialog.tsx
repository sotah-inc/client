import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangeIsDeleteListDialogOpen, FetchDeletePricelist } from "@app/actions/price-lists";
import { IDeletePricelistRequestOptions } from "@app/api/price-lists";
import { DeleteListDialog, IDispatchProps, IStateProps } from "@app/components/App/PriceLists/DeleteListDialog";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile } = state.Main;
    const { selectedList, isDeleteListDialogOpen, deletePricelistLevel } = state.PriceLists;
    return {
        deletePricelistLevel,
        isDeleteListDialogOpen,
        profile,
        selectedList,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeIsDeleteListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsDeleteListDialogOpen(isDialogOpen)),
        deletePricelist: (opts: IDeletePricelistRequestOptions) => dispatch(FetchDeletePricelist(opts)),
    };
};

export const DeleteListDialogContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(DeleteListDialog);
