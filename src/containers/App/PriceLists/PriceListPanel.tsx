import { connect, Dispatch } from 'react-redux';

import { StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists/PriceListPanel';
import PriceListPanel from '@app/form-containers/App/PriceLists/PriceListPanel';
import { StoreState } from '@app/types';
import { PriceListEntry, EntryCreateLevel } from '@app/types/price-lists';
import { Actions } from '@app/actions';
import { CreateEntry, ChangeEntryCreateLevel } from '@app/actions/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  const { entryCreateLevel } = state.PriceLists;
  return { entryCreateLevel };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onSubmit: (entry: PriceListEntry) => dispatch(CreateEntry(entry)),
    changeCreateLevel: (level: EntryCreateLevel) => dispatch(ChangeEntryCreateLevel(level))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PriceListPanel);
