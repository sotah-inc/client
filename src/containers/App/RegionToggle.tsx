import { connect, Dispatch } from 'react-redux';

import { RegionToggle, StateProps, DispatchProps, OwnProps } from '../../components/App/RegionToggle';
import { StoreState, Region } from '../../types';
import { Actions, RegionChange } from '../../actions';

const mapStateToProps = (state: StoreState): StateProps => {
  const { regions, currentRegion, fetchRegionLevel } = state;
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
