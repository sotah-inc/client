import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangeIsLoginDialogOpen } from "@app/actions/main";
import {
    ChangeIsAddEntryDialogOpen,
    ChangeIsDeleteListDialogOpen,
    ChangeIsEditListDialogOpen,
    FetchDeletePricelist,
    FetchUpdatePricelist,
} from "@app/actions/price-lists";
import { IDeletePricelistRequestOptions } from "@app/api/price-lists";
import { IDispatchProps, IStateProps, PriceLists } from "@app/components/App/PriceLists";
import { IStoreState } from "@app/types";
import { IUpdatePricelistRequestOptions } from "@app/types/price-lists";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { authLevel, profile } = state.Main;
    const {
        isAddEntryDialogOpen,
        updatePricelistLevel,
        selectedList,
        isEditListDialogOpen,
        isDeleteListDialogOpen,
    } = state.PriceLists;
    return {
        authLevel,
        isAddEntryDialogOpen,
        isDeleteListDialogOpen,
        isEditListDialogOpen,
        profile,
        selectedList,
        updatePricelistLevel,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddEntryDialogOpen(isDialogOpen)),
        changeIsDeleteListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsDeleteListDialogOpen(isDialogOpen)),
        changeIsEditListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsEditListDialogOpen(isDialogOpen)),
        changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => dispatch(ChangeIsLoginDialogOpen(isLoginDialogOpen)),
        deletePricelist: (opts: IDeletePricelistRequestOptions) => dispatch(FetchDeletePricelist(opts)),
        updatePricelist: (opts: IUpdatePricelistRequestOptions) => dispatch(FetchUpdatePricelist(opts)),
    };
};

export const PriceListsContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(PriceLists);
