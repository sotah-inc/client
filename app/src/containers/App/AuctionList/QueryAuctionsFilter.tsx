import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { ActiveSelectChange, AddAuctionsQuery, FetchAuctionsQuery, RemoveAuctionsQuery } from "@app/actions/auction";
import { IQueryAuctionsItem } from "@app/api-types/contracts/data";
import { IQueryAuctionsOptions } from "@app/api/data";
import { IDispatchProps, IStateProps, QueryAuctionsFilter } from "@app/components/App/AuctionList/QueryAuctionsFilter";
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

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        activeSelectChange: (v: boolean) => dispatch(ActiveSelectChange(v)),
        onAuctionsQueryDeselect: (index: number) => dispatch(RemoveAuctionsQuery(index)),
        onAuctionsQuerySelect: (aqItem: IQueryAuctionsItem) => dispatch(AddAuctionsQuery(aqItem)),
        refreshAuctionsQuery: (opts: IQueryAuctionsOptions) => dispatch(FetchAuctionsQuery(opts)),
    };
};

export const QueryAuctionsFilterContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(QueryAuctionsFilter);
