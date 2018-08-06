import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangeIsAddListDialogOpen, ChangeSelectedList, FetchGetPricelists } from "@app/actions/price-lists";
import { IGetPricelistsOptions } from "@app/api/price-lists";
import { IDispatchProps, IStateProps, Listing } from "@app/components/App/PriceLists/Listing";
import { IStoreState } from "@app/types";
import { IPricelist } from "@app/types/price-lists";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRegion, currentRealm, profile, authLevel, fetchUserPreferencesLevel } = state.Main;
    const {
        pricelists,
        selectedList,
        isAddListDialogOpen,
        getPricelistsLevel,
        createPricelistLevel,
    } = state.PriceLists;
    return {
        authLevel,
        createPricelistLevel,
        currentRealm,
        currentRegion,
        fetchUserPreferencesLevel,
        getPricelistsLevel,
        isAddListDialogOpen,
        pricelists,
        profile,
        selectedList,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeIsAddListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddListDialogOpen(isDialogOpen)),
        changeSelectedList: (selectedList: IPricelist) => dispatch(ChangeSelectedList(selectedList)),
        refreshPricelists: (opts: IGetPricelistsOptions) => dispatch(FetchGetPricelists(opts)),
    };
};

export const ListingContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Listing);
