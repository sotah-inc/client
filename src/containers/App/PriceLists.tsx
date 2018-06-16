import { connect, Dispatch } from 'react-redux';

import { StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists';
import PriceLists from '@app/form-containers/App/PriceLists';
import { StoreState } from '@app/types';
import { Actions } from '@app/actions';
import { CreatePricelist } from '@app/actions/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  const { lists, onCreateLevel } = state.PriceLists;
  return { lists, onCreateLevel };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onSubmit: (name: string) => dispatch(CreatePricelist(name))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PriceLists);
