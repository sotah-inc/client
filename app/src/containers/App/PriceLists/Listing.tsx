import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import {
    ChangeIsAddListDialogOpen,
    ChangeSelectedList,
    ChangeSelectedProfession,
    FetchGetPricelists,
} from "@app/actions/price-lists";
import { IGetPricelistsOptions } from "@app/api/price-lists";
import { IDispatchProps, IStateProps, Listing } from "@app/components/App/PriceLists/Listing";
import { IStoreState } from "@app/types";
import { IProfession } from "@app/types/global";
import { IPricelist } from "@app/types/price-lists";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRegion, currentRealm, profile, authLevel, fetchUserPreferencesLevel, professions } = state.Main;
    const { pricelists, selectedList, getPricelistsLevel, selectedProfession } = state.PriceLists;
    return {
        authLevel,
        currentRealm,
        currentRegion,
        fetchUserPreferencesLevel,
        getPricelistsLevel,
        pricelists,
        professions,
        profile,
        selectedList,
        selectedProfession,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeIsAddListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddListDialogOpen(isDialogOpen)),
        changeSelectedList: (selectedList: IPricelist) => dispatch(ChangeSelectedList(selectedList)),
        changeSelectedProfession: (profession: IProfession) => dispatch(ChangeSelectedProfession(profession)),
        refreshPricelists: (opts: IGetPricelistsOptions) => dispatch(FetchGetPricelists(opts)),
    };
};

export const ListingContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(Listing);
