import { connect, Dispatch } from 'react-redux';

import {
  QueryAuctionsFilter,
  StateProps,
  DispatchProps,
  OwnProps
} from '@app/components/App/AuctionList/QueryAuctionsFilter';
import { StoreState } from '@app/types';
import { Actions } from '@app/actions';
import { AddAuctionsQuery, RemoveAuctionsQuery } from '@app/actions/auction';
import { AuctionsQueryItem } from '@app/api/data';

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
    onAuctionsQuerySelect: (aqItem: AuctionsQueryItem) => dispatch(AddAuctionsQuery(aqItem)),
    onAuctionsQueryDeselect: (index: number) => dispatch(RemoveAuctionsQuery(index))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(QueryAuctionsFilter);
