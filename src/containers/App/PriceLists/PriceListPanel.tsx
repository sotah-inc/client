import { connect, Dispatch } from 'react-redux';

import { PriceListPanel, StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists/PriceListPanel';
import { StoreState } from '@app/types';
import { EntryCreateLevel } from '@app/types/price-lists';
import { Actions } from '@app/actions';
import { ChangeEntryCreateLevel } from '@app/actions/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  const { entryCreateLevel } = state.PriceLists;
  return { entryCreateLevel };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    changeCreateLevel: (level: EntryCreateLevel) => dispatch(ChangeEntryCreateLevel(level))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PriceListPanel);
