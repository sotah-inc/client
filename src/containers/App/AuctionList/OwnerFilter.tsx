import { connect, Dispatch } from 'react-redux';

import { OwnerFilter, StateProps, DispatchProps, OwnProps } from '@app/components/App/AuctionList/OwnerFilter';
import { StoreState } from '@app/types';
import { OwnerName } from '@app/types/global';
import { Actions } from '@app/actions';
import { OwnerFilterChange, FetchOwners } from '@app/actions/auction';
import { GetOwnersOptions } from '@app/api/data';

const mapStateToProps = (state: StoreState): StateProps => {
  const { fetchOwnersLevel, owners, ownerFilter, currentRegion, currentRealm } = state.Auction;
  return { fetchOwnersLevel, owners, ownerFilter, currentRegion, currentRealm };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onOwnerFilterChange: (owner: OwnerName) => dispatch(OwnerFilterChange(owner)),
    refreshOwners: (opts: GetOwnersOptions) => dispatch(FetchOwners(opts))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(OwnerFilter);
