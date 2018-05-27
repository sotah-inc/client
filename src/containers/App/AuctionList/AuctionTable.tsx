import { connect, Dispatch } from 'react-redux';

import { AuctionTable, StateProps, DispatchProps, OwnProps } from '@app/components/App/AuctionList/AuctionTable';
import { StoreState } from '@app/types';
import { Actions } from '@app/actions';

const mapStateToProps = (state: StoreState): StateProps => {
  const { auctions } = state.Auction;
  return { auctions };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {};
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AuctionTable);
