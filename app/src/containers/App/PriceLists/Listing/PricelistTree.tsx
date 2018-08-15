import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ChangeSelectedList, ChangeSelectedProfession } from "@app/actions/price-lists";
import { IDispatchProps, IStateProps, PricelistTree } from "@app/components/App/PriceLists/Listing/PricelistTree";
import { IStoreState } from "@app/types";
import { IProfession } from "@app/types/global";
import { IPricelist } from "@app/types/price-lists";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRealm, professions } = state.Main;
    const { pricelists, selectedList, selectedProfession } = state.PriceLists;
    return {
        currentRealm,
        pricelists,
        professions,
        selectedList,
        selectedProfession,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        changeSelectedList: (selectedList: IPricelist) => dispatch(ChangeSelectedList(selectedList)),
        changeSelectedProfession: (profession: IProfession) => dispatch(ChangeSelectedProfession(profession)),
    };
};

export const PricelistTreeContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(PricelistTree);
