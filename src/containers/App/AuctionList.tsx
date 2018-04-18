import { connect, Dispatch } from 'react-redux';

import { AuctionList, StateProps, DispatchProps, OwnProps } from '@app/components/App/AuctionList';
import { StoreState } from '@app/types';
import { Actions } from '@app/actions';

const mapStateToProps = (state: StoreState): StateProps => {
  const { fetchAuctionsLevel, auctions } = state.Auction;
  return { fetchAuctionsLevel, auctions: auctions };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {};
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AuctionList);
