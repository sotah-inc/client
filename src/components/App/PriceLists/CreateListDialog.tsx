import * as React from 'react';
import { Dialog, Tabs, Tab } from '@blueprintjs/core';

import CreateListForm from '@app/containers/App/PriceLists/CreateListForm';
import { DialogBody } from '@app/components/util';

export type StateProps = {
  isAddListDialogOpen: boolean
};

export type DispatchProps = {
  changeIsAddListDialogOpen: (isDialogOpen: boolean) => void
};

export type OwnProps = {};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

type State = Readonly<{
  selectedTabId: string
}>;

export class CreateListDialog extends React.Component<Props, State> {
  state: State = {
    selectedTabId: 'create-list'
  };

  toggleListDialog() {
    this.props.changeIsAddListDialogOpen(!this.props.isAddListDialogOpen);
  }

  handleTabChange(selectedTabId: React.ReactText) {
    this.setState({ selectedTabId: selectedTabId.toString() });
  }

  renderCreateEntryForm() {
    return (
      <p>wew</p>
    );
  }

  renderCreateListForm() {
    return (
      <CreateListForm />
    );
  }

  render() {
    const { isAddListDialogOpen } = this.props;
    const { selectedTabId } = this.state;

    return (
      <Dialog
        isOpen={isAddListDialogOpen}
        onClose={() => this.toggleListDialog()}
        title="New Price List"
        icon="manually-entered-data"
      >
        <DialogBody>
          <Tabs
            id="create-list-dialog"
            selectedTabId={selectedTabId}
            onChange={(v) => this.handleTabChange(v)}
          >
            <Tab id="create-list" title="List Form" panel={this.renderCreateListForm()} />
            <Tab id="create-entry" title="Entries Form" panel={this.renderCreateEntryForm()} />
          </Tabs>
        </DialogBody>
      </Dialog>
    );
  }
}
