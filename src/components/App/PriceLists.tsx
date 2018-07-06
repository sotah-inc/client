import * as React from 'react';
import { Dialog } from '@blueprintjs/core';

import { PriceListEntry } from '@app/types/price-lists';
import CreateListDialog from '@app/containers/App/PriceLists/CreateListDialog';
import CreateEntryForm from '@app/containers/App/PriceLists/CreateEntryForm';
import ActionBar from '@app/containers/App/PriceLists/ActionBar';
import Listing from '@app/containers/App/PriceLists/Listing';

import './PriceLists.scss';

export type StateProps = {
  isAddEntryDialogOpen: boolean
};

export type DispatchProps = {
  changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => void
  createEntry: (entry: PriceListEntry) => void
};

export type OwnProps = {};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class PriceLists extends React.Component<Props> {
  toggleEntryDialog() {
    this.props.changeIsAddEntryDialogOpen(!this.props.isAddEntryDialogOpen);
  }

  onCreateEntryFormComplete(entry: PriceListEntry) {
    this.props.createEntry(entry);
  }

  render() {
    const { isAddEntryDialogOpen } = this.props;

    return (
      <>
        <CreateListDialog />
        <Dialog
          isOpen={isAddEntryDialogOpen}
          onClose={() => this.toggleEntryDialog()}
          title="New Entry"
          icon="manually-entered-data"
        >
          <CreateEntryForm onComplete={(v: PriceListEntry) => this.onCreateEntryFormComplete(v)} />
        </Dialog>
        <ActionBar />
        <Listing />
      </>
    );
  }
}
