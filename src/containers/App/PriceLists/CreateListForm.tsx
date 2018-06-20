import { connect, Dispatch } from 'react-redux';

import { StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists/CreateListForm';
import CreateListForm from '@app/form-containers/App/PriceLists/CreateListForm';
import { StoreState } from '@app/types';
import { Actions } from '@app/actions';
import { CreateList } from '@app/actions/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    createList: (name: string) => dispatch(CreateList(name))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(CreateListForm);
