import { connect, Dispatch } from 'react-redux';

import { PriceLists, StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists';
import { StoreState } from '@app/types';
import { PricelistEntry } from '@app/types/price-lists';
import { Actions } from '@app/actions';
import { ChangeIsLoginDialogOpen } from '@app/actions/main';
import { ChangeIsAddEntryDialogOpen, CreateEntry } from '@app/actions/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  const { authLevel } = state.Main;
  const { isAddEntryDialogOpen } = state.PriceLists;
  return { isAddEntryDialogOpen, authLevel };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddEntryDialogOpen(isDialogOpen)),
    createEntry: (entry: PricelistEntry) => dispatch(CreateEntry(entry)),
    changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => dispatch(ChangeIsLoginDialogOpen(isLoginDialogOpen))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PriceLists);
