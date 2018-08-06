import { connect, Dispatch } from 'react-redux';

import { AuctionTable, StateProps, DispatchProps, OwnProps } from '@app/components/App/AuctionList/AuctionTable';
import { IStoreState } from '@app/types';
import { IQueryAuctionResult } from '@app/types/auction';
import { Actions } from '@app/actions';
import { AddAuctionsQuery, RemoveAuctionsQuery } from '@app/actions/auction';

const mapStateToProps = (state: IStoreState): StateProps => {
  const { auctions, selectedQueryAuctionResults } = state.Auction;
  return { auctions, selectedItems: selectedQueryAuctionResults };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onAuctionsQuerySelect: (aqItem: IQueryAuctionResult) => dispatch(AddAuctionsQuery(aqItem)),
    onAuctionsQueryDeselect: (index: number) => dispatch(RemoveAuctionsQuery(index))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AuctionTable);
