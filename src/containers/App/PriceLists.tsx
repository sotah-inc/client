import { connect, Dispatch } from 'react-redux';

import { PriceLists, StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists';
import { StoreState } from '@app/types';
import { PricelistEntry } from '@app/types/price-lists';
import { Actions } from '@app/actions';
import { ChangeIsAddEntryDialogOpen, CreateEntry } from '@app/actions/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  const { isAddEntryDialogOpen } = state.PriceLists;
  return { isAddEntryDialogOpen };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => dispatch(ChangeIsAddEntryDialogOpen(isDialogOpen)),
    createEntry: (entry: PricelistEntry) => dispatch(CreateEntry(entry))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PriceLists);
