import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangeIsAddListDialogOpen, ChangeSelectedList, FetchGetPricelists } from "@app/actions/price-lists";
import { IGetPricelistsOptions } from "@app/api/price-lists";
import { DispatchProps, Listing, OwnProps, StateProps } from "@app/components/App/PriceLists/Listing";
import { IStoreState } from "@app/types";
import { IPricelist } from "@app/types/price-lists";

const mapStateToProps = (state: IStoreState): StateProps => {
    const { currentRegion, currentRealm, profile, authLevel, fetchUserPreferencesLevel } = state.Main;
    const {
        pricelists,
        selectedList,
        isAddListDialogOpen,
        getPricelistsLevel,
        createPricelistLevel,
    } = state.PriceLists;
    return {
        pricelists,
        selectedList,
        currentRegion,
        currentRealm,
        isAddListDialogOpen,
        getPricelistsLevel,
        profile,
        authLevel,
        fetchUserPreferencesLevel,
        createPricelistLevel,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
    return {
        changeSelectedList: (selectedList: IPricelist) => dispatch(ChangeSelectedList(selectedList)),
        changeIsAddListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddListDialogOpen(isDialogOpen)),
        refreshPricelists: (opts: IGetPricelistsOptions) => dispatch(FetchGetPricelists(opts)),
    };
};

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Listing);
