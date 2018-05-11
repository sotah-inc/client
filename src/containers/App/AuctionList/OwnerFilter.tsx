import { connect, Dispatch } from 'react-redux';

import { OwnerFilter, StateProps, DispatchProps, OwnProps } from '@app/components/App/AuctionList/OwnerFilter';
import { StoreState } from '@app/types';
import { OwnerName } from '@app/types/global';
import { Actions } from '@app/actions';
import { OwnerFilterChange } from '@app/actions/auction';

const mapStateToProps = (state: StoreState): StateProps => {
  const { fetchOwnersLevel, owners, ownerFilter } = state.Auction;
  return { fetchOwnersLevel, owners, ownerFilter };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onOwnerFilterChange: (owner: OwnerName) => dispatch(OwnerFilterChange(owner))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(OwnerFilter);
