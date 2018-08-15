import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import {
    ChangeIsAddEntryDialogOpen,
    ChangeIsAddListDialogOpen,
    ChangeIsDeleteListDialogOpen,
    ChangeIsEditListDialogOpen,
} from "@app/actions/price-lists";
import { ActionBar, IDispatchProps, IStateProps } from "@app/components/App/PriceLists/ActionBar";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRegion, currentRealm } = state.Main;
    const { isAddListDialogOpen, isAddEntryDialogOpen, selectedList, selectedProfession } = state.PriceLists;
    return {
        currentRealm,
        currentRegion,
        isAddEntryDialogOpen,
        isAddListDialogOpen,
        selectedList,
        selectedProfession,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddEntryDialogOpen(isDialogOpen)),
        changeIsAddListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddListDialogOpen(isDialogOpen)),
        changeIsDeleteListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsDeleteListDialogOpen(isDialogOpen)),
        changeIsEditListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsEditListDialogOpen(isDialogOpen)),
    };
};

export const ActionBarContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(ActionBar);
