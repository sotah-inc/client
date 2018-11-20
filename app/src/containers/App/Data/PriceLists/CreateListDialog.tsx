import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import {
    AppendItems,
    ChangeIsAddListDialogOpen,
    FetchCreatePricelist,
    FetchCreateProfessionPricelist,
} from "@app/actions/price-lists";
import { ICreatePricelistRequest } from "@app/api-types/contracts/user/pricelist-crud";
import { ICreateProfessionPricelistRequest } from "@app/api-types/contracts/user/profession-pricelists-crud";
import { IItemsMap } from "@app/api-types/item";
import { CreateListDialog, IDispatchProps, IStateProps } from "@app/components/App/Data/PriceLists/CreateListDialog";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile } = state.Main;
    const {
        isAddListDialogOpen,
        createPricelistLevel,
        createPricelistErrors,
        selectedProfession,
        selectedExpansion,
    } = state.PriceLists;

    return {
        createPricelistErrors,
        createPricelistLevel,
        isAddListDialogOpen,
        profile,
        selectedExpansion,
        selectedProfession,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        appendItems: (items: IItemsMap) => dispatch(AppendItems(items)),
        changeIsAddListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddListDialogOpen(isDialogOpen)),
        createPricelist: (token: string, request: ICreatePricelistRequest) =>
            dispatch(FetchCreatePricelist(token, request)),
        createProfessionPricelist: (token: string, request: ICreateProfessionPricelistRequest) =>
            dispatch(FetchCreateProfessionPricelist(token, request)),
    };
};

export const CreateListDialogContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(CreateListDialog);
