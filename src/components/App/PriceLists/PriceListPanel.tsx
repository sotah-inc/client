import * as React from 'react';
import { Button, NonIdealState, Dialog } from '@blueprintjs/core';

import { Item, Region, Realm } from '@app/types/global';
import { PriceList, EntryCreateLevel } from '@app/types/price-lists';
import CreateEntryForm from '@app/containers/App/PriceLists/CreateEntryForm';
import { PriceListTable } from '@app/components/App/PriceLists/PriceListPanel/PriceListTable';

export type StateProps = {
  entryCreateLevel: EntryCreateLevel
  currentRegion: Region | null
  currentRealm: Realm | null
};

export type DispatchProps = {
  changeCreateLevel: (createLevel: EntryCreateLevel) => void
};

export type OwnProps = {
  list: PriceList
};

export type FormValues = {
  quantity: number
  item: Item | null
};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

type State = Readonly<{
  isDialogOpen: boolean
}>;

export class PriceListPanel extends React.Component<Props, State> {
  state: State = {
    isDialogOpen: false
  };

  componentDidUpdate() {
    const { entryCreateLevel, changeCreateLevel } = this.props;

    switch (entryCreateLevel) {
      case EntryCreateLevel.success:
        this.setState({ isDialogOpen: false });
        changeCreateLevel(EntryCreateLevel.initial);

        break;
      default:
        break;
    }
  }

  toggleDialog() {
    this.setState({ isDialogOpen: !this.state.isDialogOpen });
  }

  renderList() {
    const { list, currentRegion, currentRealm } = this.props;

    if (list.entries.length === 0) {
      return (
        <NonIdealState
          title="No entries"
          description="You have no items to check."
          visual="list"
          action={<Button className="pt-fill" icon="plus" onClick={() => this.toggleDialog()}>Add List</Button>}
        />
      );
    }

    return (
      <PriceListTable list={list} region={currentRegion!} realm={currentRealm!} />
    );
  }

  render() {
    return (
      <>
        <Dialog
          isOpen={this.state.isDialogOpen}
          onClose={() => this.toggleDialog()}
          title="New Entry"
          icon="manually-entered-data"
          canOutsideClickClose={false}
        >
          <CreateEntryForm />
        </Dialog>
        {this.renderList()}
      </>
    );
  }
}