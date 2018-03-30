import { connect, Dispatch } from 'react-redux';

import { Regions, StateProps, DispatchProps, OwnProps } from '../components/Regions';
import { StoreState } from '../types';

const mapStateToProps = (state: StoreState): StateProps => {
  return {regions: state.regions};
};

const mapDispatchToProps = (dispatch: Dispatch<Regions>): DispatchProps => {
  return {};
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Regions);
