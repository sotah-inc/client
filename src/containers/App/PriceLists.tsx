import { connect, Dispatch } from 'react-redux';

import { StateProps, DispatchProps, OwnProps } from '@app/components/App/PriceLists';
import PriceLists from '@app/form-containers/App/PriceLists';
import { StoreState } from '@app/types';
import { ListCreateLevel, PriceList } from '@app/types/price-lists';
import { Actions } from '@app/actions';
import { CreateList, ChangeListCreateLevel, ChangeSelectedList } from '@app/actions/price-lists';

const mapStateToProps = (state: StoreState): StateProps => {
  const { lists, listCreateLevel, selectedList } = state.PriceLists;
  return { lists, listCreateLevel, selectedList };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => {
  return {
    onSubmit: (name: string) => dispatch(CreateList(name)),
    changeCreateLevel: (createLevel: ListCreateLevel) => dispatch(ChangeListCreateLevel(createLevel)),
    changeSelectedList: (selectedList: PriceList) => dispatch(ChangeSelectedList(selectedList))
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PriceLists);
