import { connect, Dispatch } from 'react-redux';

import { AuctionList, StateProps, DispatchProps, OwnProps } from '../../components/App/AuctionList';
import { StoreState } from '../../types';
import { Actions } from '../../actions';

const mapStateToProps = (state: StoreState): StateProps => {
  const { fetchAuctionsLevel, items } = state.Auction;
  return { fetchAuctionsLevel, auctions: items };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {};
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AuctionList);
