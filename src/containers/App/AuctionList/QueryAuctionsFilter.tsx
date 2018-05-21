import { connect, Dispatch } from 'react-redux';

import {
  QueryAuctionsFilter,
  StateProps,
  DispatchProps,
  OwnProps
} from '@app/components/App/AuctionList/QueryAuctionsFilter';
import { StoreState } from '@app/types';
import { QueryAuctionResult } from '@app/types/auction';
import { Actions } from '@app/actions';
import { AddAuctionsQuery, RemoveAuctionsQuery, FetchAuctionsQuery } from '@app/actions/auction';
import { QueryAuctionsOptions } from '@app/api/data';

const mapStateToProps = (state: StoreState): StateProps => {
  const {
    queryAuctionsLevel,
    currentRegion,
    currentRealm,
    queryAuctionResults,
    selectedQueryAuctionResults
  } = state.Auction;
  return {
    queryAuctionsLevel,
    currentRegion,
    currentRealm,
    items: queryAuctionResults,
    selectedItems: selectedQueryAuctionResults
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onAuctionsQuerySelect: (aqItem: QueryAuctionResult) => dispatch(AddAuctionsQuery(aqItem)),
    onAuctionsQueryDeselect: (index: number) => dispatch(RemoveAuctionsQuery(index)),
    refreshAuctionsQuery: (opts: QueryAuctionsOptions) => dispatch(FetchAuctionsQuery(opts))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(QueryAuctionsFilter);
