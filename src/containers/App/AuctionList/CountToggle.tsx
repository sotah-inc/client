import { connect, Dispatch } from 'react-redux';

import { CountToggle, StateProps, DispatchProps, OwnProps } from '@app/components/App/AuctionList/CountToggle';
import { StoreState } from '@app/types';
import { Actions } from '@app/actions';
import { CountChange } from '@app/actions/auction';

const mapStateToProps = (state: StoreState): StateProps => {
  const { auctionsPerPage } = state.Auction;
  return { auctionsPerPage };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onCountChange: (count: number) => dispatch(CountChange(count))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(CountToggle);
