import { connect, Dispatch } from 'react-redux';

import { StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists/util/ListForm';
import ListForm from '@app/form-containers/App/PriceLists/util/ListForm';
import { StoreState } from '@app/types';
import { Actions } from '@app/actions';

const mapStateToProps = (state: StoreState): StateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {};
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ListForm);
