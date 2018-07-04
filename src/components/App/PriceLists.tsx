import * as React from 'react';
import { Dialog } from '@blueprintjs/core';

import CreateListForm from '@app/containers/App/PriceLists/CreateListForm';
import CreateEntryForm from '@app/containers/App/PriceLists/CreateEntryForm';
import ActionBar from '@app/containers/App/PriceLists/ActionBar';
import Listing from '@app/containers/App/PriceLists/Listing';

import './PriceLists.scss';

export type StateProps = {
  isAddListDialogOpen: boolean
  isAddEntryDialogOpen: boolean
};

export type DispatchProps = {
  changeIsAddListDialogOpen: (isDialogOpen: boolean) => void
  changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => void
};

export type OwnProps = {};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class PriceLists extends React.Component<Props> {
  toggleListDialog() {
    this.props.changeIsAddListDialogOpen(!this.props.isAddListDialogOpen);
  }

  toggleEntryDialog() {
    this.props.changeIsAddEntryDialogOpen(!this.props.isAddEntryDialogOpen);
  }

  render() {
    const { isAddListDialogOpen } = this.props;

    return (
      <>
        <Dialog
          isOpen={isAddListDialogOpen}
          onClose={() => this.toggleListDialog()}
          title="New Price List"
          icon="manually-entered-data"
        >
          <CreateListForm />
        </Dialog>
        <Dialog
          isOpen={this.props.isAddEntryDialogOpen}
          onClose={() => this.toggleEntryDialog()}
          title="New Entry"
          icon="manually-entered-data"
          canOutsideClickClose={false}
        >
          <CreateEntryForm />
        </Dialog>
        <ActionBar />
        <Listing />
      </>
    );
  }
}
