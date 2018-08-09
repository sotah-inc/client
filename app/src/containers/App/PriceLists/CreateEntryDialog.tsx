import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangeIsAddEntryDialogOpen, FetchUpdatePricelist } from "@app/actions/price-lists";
import { CreateEntryDialog, IDispatchProps, IStateProps } from "@app/components/App/PriceLists/CreateEntryDialog";
import { IStoreState } from "@app/types";
import { IUpdatePricelistRequestOptions } from "@app/types/price-lists";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { profile } = state.Main;
    const { isAddEntryDialogOpen, updatePricelistLevel, selectedList } = state.PriceLists;
    return {
        isAddEntryDialogOpen,
        profile,
        selectedList,
        updatePricelistLevel,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddEntryDialogOpen(isDialogOpen)),
        updatePricelist: (opts: IUpdatePricelistRequestOptions) => dispatch(FetchUpdatePricelist(opts)),
    };
};

export const CreateEntryDialogContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(CreateEntryDialog);
