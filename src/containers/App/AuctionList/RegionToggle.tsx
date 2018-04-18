import { connect, Dispatch } from 'react-redux';

import { RegionToggle, StateProps, DispatchProps, OwnProps } from 'components/App/AuctionList/RegionToggle';
import { StoreState } from 'types';
import { Region } from 'types/global';
import { Actions } from 'actions';
import { RegionChange } from 'actions/auction';

const mapStateToProps = (state: StoreState): StateProps => {
  const { regions, currentRegion, fetchRegionLevel } = state.Auction;
  return { regions, currentRegion, fetchRegionLevel };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onRegionChange: (region: Region) => dispatch(RegionChange(region))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(RegionToggle);
