import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import {
    ChangeSelectedExpansion,
    ChangeSelectedList,
    ChangeSelectedProfession,
    FetchGetPricelists,
    FetchGetProfessionPricelists,
    ResetProfessionsSelections,
} from "@app/actions/price-lists";
import { IPricelistJson } from "@app/api-types/entities";
import { IProfession, ProfessionName } from "@app/api-types/profession";
import { IDispatchProps, IStateProps, PricelistTree } from "@app/components/App/Data/PriceLists/PricelistTree";
import { IStoreState } from "@app/types";
import { ISelectExpansionPayload } from "@app/types/price-lists";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const {
        currentRealm,
        professions,
        currentRegion,
        expansions,
        authLevel,
        fetchUserPreferencesLevel,
        profile,
    } = state.Main;
    const {
        pricelists,
        selectedList,
        selectedProfession,
        getProfessionPricelistsLevel,
        professionPricelists,
        selectedExpansion,
        items,
    } = state.PriceLists;
    return {
        authLevel,
        currentRealm,
        currentRegion,
        expansions,
        fetchUserPreferencesLevel,
        getProfessionPricelistsLevel,
        items,
        pricelists,
        professionPricelists,
        professions,
        profile,
        selectedExpansion,
        selectedList,
        selectedProfession,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeSelectedExpansion: (v: ISelectExpansionPayload) => dispatch(ChangeSelectedExpansion(v)),
        changeSelectedList: (selectedList: IPricelistJson) => dispatch(ChangeSelectedList(selectedList)),
        changeSelectedProfession: (profession: IProfession) => dispatch(ChangeSelectedProfession(profession)),
        refreshPricelists: (token: string) => dispatch(FetchGetPricelists(token)),
        refreshProfessionPricelists: (profession: ProfessionName) => dispatch(FetchGetProfessionPricelists(profession)),
        resetProfessionsSelections: () => dispatch(ResetProfessionsSelections()),
    };
};

export const PricelistTreeContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(PricelistTree);
