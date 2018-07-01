import { connect, Dispatch } from 'react-redux';

import { RegionToggle, StateProps, DispatchProps, OwnProps } from '@app/components/App/AuctionList/RegionToggle';
import { StoreState } from '@app/types';
import { Region } from '@app/types/global';
import { Actions } from '@app/actions';
import { RegionChange } from '@app/actions/main';

const mapStateToProps = (state: StoreState): StateProps => {
  const { regions, currentRegion, fetchRegionLevel } = state.Main;
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
