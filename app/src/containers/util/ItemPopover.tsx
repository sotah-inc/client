import { connect, Dispatch } from 'react-redux';

import { ItemPopover, StateProps, DispatchProps, OwnProps } from '@app/components/util/ItemPopover';
import { IStoreState } from '@app/types';
import { Actions } from '@app/actions';

const mapStateToProps = (state: IStoreState): StateProps => {
  const { itemClasses } = state.Auction;
  return { itemClasses };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {};
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ItemPopover);
