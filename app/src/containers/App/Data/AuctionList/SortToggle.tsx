import { connect } from "react-redux";

import { SortChange } from "@app/actions/auction";
import { IDispatchProps, IOwnProps, IStateProps, SortToggle } from "@app/components/App/Data/AuctionList/SortToggle";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { sortDirection, sortKind } = state.Auction;
    return { currentSortDirection: sortDirection, currentSortKind: sortKind };
};

const mapDispatchToProps: IDispatchProps = {
    onChange: SortChange,
};

export const SortToggleContainer = connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(SortToggle);
