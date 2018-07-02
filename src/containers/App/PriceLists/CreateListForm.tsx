import { connect, Dispatch } from 'react-redux';

import { StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists/CreateListForm';
import CreateListForm from '@app/form-containers/App/PriceLists/CreateListForm';
import { StoreState } from '@app/types';
import { PriceListOptions } from '@app/types/price-lists';
import { Actions } from '@app/actions';
import { CreateList } from '@app/actions/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  const { currentRegion, currentRealm } = state.Main;
  return { currentRegion, currentRealm };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    createList: (opts: PriceListOptions) => dispatch(CreateList(opts))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(CreateListForm);
