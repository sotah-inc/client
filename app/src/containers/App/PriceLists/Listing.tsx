import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangeIsAddListDialogOpen, FetchGetPricelists } from "@app/actions/price-lists";
import { IGetPricelistsOptions } from "@app/api/price-lists";
import { IDispatchProps, IStateProps, Listing } from "@app/components/App/PriceLists/Listing";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRegion, currentRealm, profile, authLevel, fetchUserPreferencesLevel } = state.Main;
    const { pricelists, getPricelistsLevel } = state.PriceLists;
    return {
        authLevel,
        currentRealm,
        currentRegion,
        fetchUserPreferencesLevel,
        getPricelistsLevel,
        pricelists,
        profile,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeIsAddListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddListDialogOpen(isDialogOpen)),
        refreshPricelists: (opts: IGetPricelistsOptions) => dispatch(FetchGetPricelists(opts)),
    };
};

export const ListingContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Listing);
