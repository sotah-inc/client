import { connect, Dispatch } from 'react-redux';

import { RegionToggle, StateProps, DispatchProps, OwnProps } from '../../components/App/RegionToggle';
import { StoreState, RegionName } from '../../types';
import { SotahClientAction, RegionChange } from '../../actions';

const mapStateToProps = (state: StoreState): StateProps => {
  const { regions, currentRegionName } = state;
  return { regions, currentRegionName };
};

const mapDispatchToProps = (dispatch: Dispatch<SotahClientAction>): DispatchProps => {
  return {
    onRegionChange: (regionName: RegionName) => dispatch(RegionChange(regionName))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(RegionToggle);
