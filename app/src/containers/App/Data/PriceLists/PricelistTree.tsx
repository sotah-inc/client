import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import {
    ChangeSelectedExpansion,
    ChangeSelectedList,
    FetchGetPricelists,
    FetchGetProfessionPricelists,
} from "@app/actions/price-lists";
import { IPricelistJson } from "@app/api-types/entities";
import { IExpansion } from "@app/api-types/expansion";
import { ProfessionName } from "@app/api-types/profession";
import { IDispatchProps, IStateProps, PricelistTree } from "@app/components/App/Data/PriceLists/PricelistTree";
import { IStoreState } from "@app/types";

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
        getPricelistsLevel,
    } = state.PriceLists;
    return {
        authLevel,
        currentRealm,
        currentRegion,
        expansions,
        fetchUserPreferencesLevel,
        getPricelistsLevel,
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
        changeSelectedExpansion: (v: IExpansion) => dispatch(ChangeSelectedExpansion(v)),
        changeSelectedList: (selectedList: IPricelistJson) => dispatch(ChangeSelectedList(selectedList)),
        refreshPricelists: (token: string) => dispatch(FetchGetPricelists(token)),
        refreshProfessionPricelists: (profession: ProfessionName) => dispatch(FetchGetProfessionPricelists(profession)),
    };
};

export const PricelistTreeContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(PricelistTree);
