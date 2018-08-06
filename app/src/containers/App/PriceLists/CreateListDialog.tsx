import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangeIsAddListDialogOpen, FetchCreatePricelist } from "@app/actions/price-lists";
import { ICreatePricelistRequest } from "@app/api/price-lists";
import { CreateListDialog, IDispatchProps, IStateProps } from "@app/components/App/PriceLists/CreateListDialog";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRegion, currentRealm, profile } = state.Main;
    const { isAddListDialogOpen, createPricelistLevel, createPricelistErrors } = state.PriceLists;
    const { itemClasses } = state.Auction;

    return {
        createPricelistErrors,
        createPricelistLevel,
        currentRealm,
        currentRegion,
        isAddListDialogOpen,
        itemClasses,
        profile,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeIsAddListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddListDialogOpen(isDialogOpen)),
        createPricelist: (token: string, request: ICreatePricelistRequest) =>
            dispatch(FetchCreatePricelist(token, request)),
    };
};

export const CreateListDialogContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(CreateListDialog);
