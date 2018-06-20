import { connect, Dispatch } from 'react-redux';

import { StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists/CreateEntryForm';
import CreateEntryForm from '@app/form-containers/App/PriceLists/CreateEntryForm';
import { StoreState } from '@app/types';
import { PriceListEntry } from '@app/types/price-lists';
import { Actions } from '@app/actions';
import { CreateEntry } from '@app/actions/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    createEntry: (entry: PriceListEntry) => dispatch(CreateEntry(entry))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(CreateEntryForm);
