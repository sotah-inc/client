import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { SortChange } from "@app/actions/auction";
import { IDispatchProps, IOwnProps, IStateProps, SortToggle } from "@app/components/App/Data/AuctionList/SortToggle";
import { IStoreState } from "@app/types";
import { ISortChangeOptions } from "@app/types/auction";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { sortDirection, sortKind } = state.Auction;
    return { currentSortDirection: sortDirection, currentSortKind: sortKind };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        onChange: (payload: ISortChangeOptions) => dispatch(SortChange(payload)),
    };
};

export const SortToggleContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(SortToggle);
