import { connect } from "react-redux";

import { ActiveSelectChange, AddAuctionsQuery, FetchAuctionsQuery, RemoveAuctionsQuery } from "@app/actions/auction";
import {
    IDispatchProps,
    IStateProps,
    QueryAuctionsFilter,
} from "@app/components/App/Data/AuctionList/QueryAuctionsFilter";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { currentRegion, currentRealm } = state.Main;
    const { queryAuctionsLevel, queryAuctionResults, selectedQueryAuctionResults, activeSelect } = state.Auction;
    return {
        activeSelect,
        currentRealm,
        currentRegion,
        items: queryAuctionResults,
        queryAuctionsLevel,
        selectedItems: selectedQueryAuctionResults,
    };
};

const mapDispatchToProps: IDispatchProps = {
    activeSelectChange: ActiveSelectChange,
    fetchAuctionsQuery: FetchAuctionsQuery,
    onAuctionsQueryDeselect: RemoveAuctionsQuery,
    onAuctionsQuerySelect: AddAuctionsQuery,
};

export const QueryAuctionsFilterContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(QueryAuctionsFilter);
