import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import {
    ChangeSelectedExpansion,
    ChangeSelectedList,
    ChangeSelectedProfession,
    FetchProfessionPricelists,
} from "@app/actions/price-lists";
import { IGetProfessionPricelistsRequestOptions } from "@app/api/price-lists";
import { IDispatchProps, IStateProps, PricelistTree } from "@app/components/App/PriceLists/Listing/PricelistTree";
import { IStoreState } from "@app/types";
import { IExpansion, IProfession } from "@app/types/global";
import { IPricelist } from "@app/types/price-lists";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRealm, professions, currentRegion, expansions } = state.Main;
    const {
        pricelists,
        selectedList,
        selectedProfession,
        getProfessionPricelistsLevel,
        professionPricelists,
        selectedExpansion,
    } = state.PriceLists;
    return {
        currentRealm,
        currentRegion,
        expansions,
        getProfessionPricelistsLevel,
        pricelists,
        professionPricelists,
        professions,
        selectedExpansion,
        selectedList,
        selectedProfession,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeSelectedExpansion: (v: IExpansion) => dispatch(ChangeSelectedExpansion(v)),
        changeSelectedList: (selectedList: IPricelist) => dispatch(ChangeSelectedList(selectedList)),
        changeSelectedProfession: (profession: IProfession) => dispatch(ChangeSelectedProfession(profession)),
        refreshProfessionPricelists: (opts: IGetProfessionPricelistsRequestOptions) =>
            dispatch(FetchProfessionPricelists(opts)),
    };
};

export const PricelistTreeContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(PricelistTree);
