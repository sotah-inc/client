import { connect, Dispatch } from 'react-redux';

import { PriceLists, StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists';
import { StoreState } from '@app/types';
import { Actions } from '@app/actions';

const mapStateToProps = (state: StoreState): StateProps => {
  console.log(state);
  const { lists } = state.PriceLists;
  return { lists };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {};
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PriceLists);
