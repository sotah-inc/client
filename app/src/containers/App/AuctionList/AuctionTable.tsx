import { connect, Dispatch } from 'react-redux';

import { AuctionTable, StateProps, DispatchProps, OwnProps } from '@app/components/App/AuctionList/AuctionTable';
import { StoreState } from '@app/types';
import { QueryAuctionResult } from '@app/types/auction';
import { Actions } from '@app/actions';
import { AddAuctionsQuery, RemoveAuctionsQuery } from '@app/actions/auction';

const mapStateToProps = (state: StoreState): StateProps => {
  const { auctions, selectedQueryAuctionResults } = state.Auction;
  return { auctions, selectedItems: selectedQueryAuctionResults };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onAuctionsQuerySelect: (aqItem: QueryAuctionResult) => dispatch(AddAuctionsQuery(aqItem)),
    onAuctionsQueryDeselect: (index: number) => dispatch(RemoveAuctionsQuery(index))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AuctionTable);
