import { connect, Dispatch } from 'react-redux';

import {
  QueryAuctionsFilter,
  StateProps,
  DispatchProps,
  OwnProps
} from '@app/components/App/AuctionList/QueryAuctionsFilter';
import { StoreState } from '@app/types';
import { Actions } from '@app/actions';

const mapStateToProps = (state: StoreState): StateProps => {
  const {
    queryAuctionsLevel,
    currentRegion,
    currentRealm,
    queryAuctionResults,
    seletedQueryAuctionResults
  } = state.Auction;
  return {
    queryAuctionsLevel,
    currentRegion,
    currentRealm,
    items: queryAuctionResults,
    selectedItems: seletedQueryAuctionResults
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(QueryAuctionsFilter);
