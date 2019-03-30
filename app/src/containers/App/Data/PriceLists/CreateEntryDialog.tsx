import { connect } from "react-redux";

import { ChangeIsAddEntryDialogOpen, FetchUpdatePricelist } from "@app/actions/price-lists";
import { CreateEntryDialog, IDispatchProps, IStateProps } from "@app/components/App/Data/PriceLists/CreateEntryDialog";
import { IStoreState } from "@app/types";

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

const mapDispatchToProps: IDispatchProps = {
    changeIsAddEntryDialogOpen: ChangeIsAddEntryDialogOpen,
    updatePricelist: FetchUpdatePricelist,
};

export const CreateEntryDialogContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(CreateEntryDialog);
