import { connect, Dispatch } from 'react-redux';

import { PriceLists, StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists';
import { StoreState } from '@app/types';
import { Actions } from '@app/actions';
import { ChangeIsAddListDialogOpen, ChangeIsAddEntryDialogOpen } from '@app/actions/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  const { isAddListDialogOpen, isAddEntryDialogOpen } = state.PriceLists;
  return { isAddListDialogOpen, isAddEntryDialogOpen };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    changeIsAddListDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddListDialogOpen(isDialogOpen)),
    changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddEntryDialogOpen(isDialogOpen))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PriceLists);
