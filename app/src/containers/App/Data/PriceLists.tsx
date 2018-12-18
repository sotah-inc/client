import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangeIsLoginDialogOpen, FetchGetRealms, RealmChange, RegionChange } from "@app/actions/main";
import {
    ChangeSelectedExpansion,
    ChangeSelectedList,
    ChangeSelectedProfession,
    ResetProfessionsSelections,
} from "@app/actions/price-lists";
import { IPricelistJson } from "@app/api-types/entities";
import { IExpansion } from "@app/api-types/expansion";
import { IProfession } from "@app/api-types/profession";
import { IRealm, IRegion } from "@app/api-types/region";
import { IDispatchProps, IStateProps, PriceLists } from "@app/components/App/Data/PriceLists";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const {
        currentRegion,
        currentRealm,
        authLevel,
        fetchRealmLevel,
        regions,
        realms,
        professions,
        expansions,
    } = state.Main;
    const {
        selectedProfession,
        selectedExpansion,
        getProfessionPricelistsLevel,
        selectedList,
        professionPricelists,
    } = state.PriceLists;

    return {
        authLevel,
        currentRealm,
        currentRegion,
        expansions,
        fetchRealmLevel,
        getProfessionPricelistsLevel,
        professionPricelists,
        professions,
        realms,
        regions,
        selectedExpansion,
        selectedList,
        selectedProfession,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => dispatch(ChangeIsLoginDialogOpen(isLoginDialogOpen)),
        changeSelectedExpansion: (v: IExpansion) => dispatch(ChangeSelectedExpansion(v)),
        changeSelectedList: (list: IPricelistJson) => dispatch(ChangeSelectedList(list)),
        changeSelectedProfession: (profession: IProfession) => dispatch(ChangeSelectedProfession(profession)),
        fetchRealms: (region: IRegion) => dispatch(FetchGetRealms(region)),
        onRealmChange: (realm: IRealm) => dispatch(RealmChange(realm)),
        onRegionChange: (region: IRegion) => dispatch(RegionChange(region)),
        resetProfessionsSelections: () => dispatch(ResetProfessionsSelections()),
    };
};

export const PriceListsContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(PriceLists);
