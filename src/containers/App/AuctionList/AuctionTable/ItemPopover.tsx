import { connect, Dispatch } from 'react-redux';

import {
  ItemPopover,
  StateProps,
  DispatchProps,
  OwnProps
} from '@app/components/App/AuctionList/AuctionTable/ItemPopover';
import { StoreState } from '@app/types';
import { QueryAuctionResult } from '@app/types/auction';
import { Actions } from '@app/actions';
import { AddAuctionsQuery, RemoveAuctionsQuery } from '@app/actions/auction';

const mapStateToProps = (state: StoreState): StateProps => {
  const { selectedQueryAuctionResults } = state.Auction;
  return { selectedItems: selectedQueryAuctionResults };
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
)(ItemPopover);
