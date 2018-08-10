import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { AppendItems, ChangeIsAddListDialogOpen, FetchCreatePricelist } from "@app/actions/price-lists";
import { ICreatePricelistRequest } from "@app/api/price-lists";
import { CreateListDialog, IDispatchProps, IStateProps } from "@app/components/App/PriceLists/CreateListDialog";
import { IStoreState } from "@app/types";
import { ItemsMap } from "@app/types/global";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRegion, currentRealm, profile } = state.Main;
    const { isAddListDialogOpen, createPricelistLevel, createPricelistErrors } = state.PriceLists;

    return {
        createPricelistErrors,
        createPricelistLevel,
        currentRealm,
        currentRegion,
        isAddListDialogOpen,
        profile,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        appendItems: (items: ItemsMap) => dispatch(AppendItems(items)),
        changeIsAddListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddListDialogOpen(isDialogOpen)),
        createPricelist: (token: string, request: ICreatePricelistRequest) =>
            dispatch(FetchCreatePricelist(token, request)),
    };
};

export const CreateListDialogContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(CreateListDialog);
