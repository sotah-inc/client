import * as React from 'react';
import { Button, NonIdealState, Dialog } from '@blueprintjs/core';

import { Item } from '@app/types/global';
import { PriceList, EntryCreateLevel } from '@app/types/price-lists';
import CreateEntryForm from '@app/containers/App/PriceLists/CreateEntryForm';
import { getItemIconUrl, getItemTextValue, qualityToColorClass } from '@app/util';

export type StateProps = {
  entryCreateLevel: EntryCreateLevel
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

  renderSelectedItem(item: Item | null) {
    if (item === null) {
      return (
        <p><em>No item selected.</em></p>
      );
    }

    const className = qualityToColorClass(item.quality);
    const textValue = getItemTextValue(item);
    const itemIcon = getItemIconUrl(item);
    if (itemIcon === null) {
      return (
        <p className={className}>{textValue}</p>
      );
    }

    return (
      <h5 className={`${className} new-entry-item`}>
        <img src={itemIcon} /> {textValue}
      </h5>
    );
  }

  toggleDialog() {
    this.setState({ isDialogOpen: !this.state.isDialogOpen });
  }

  renderEntries() {
    const { entries } = this.props.list;
    if (entries.length === 0) {
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
      <p>Hello, world! {entries.length}</p>
    );
  }

  render() {
    return (
      <>
        {this.renderEntries()}
        <Dialog
          isOpen={this.state.isDialogOpen}
          onClose={() => this.toggleDialog()}
          title="New Entry"
          icon="manually-entered-data"
          canOutsideClickClose={false}
        >
          <CreateEntryForm />
        </Dialog>
      </>
    );
  }
}