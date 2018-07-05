import * as React from 'react';
import { Dialog, Breadcrumb } from '@blueprintjs/core';

import CreateListForm from '@app/containers/App/PriceLists/CreateListDialog/CreateListForm';
import { CreateListStep } from '@app/types/price-lists';

export type StateProps = {
  isAddListDialogOpen: boolean
};

export type DispatchProps = {
  changeIsAddListDialogOpen: (isDialogOpen: boolean) => void
};

export type OwnProps = {};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

type State = Readonly<{
  createListStep: CreateListStep
  listName: string
}>;

export class CreateListDialog extends React.Component<Props, State> {
  state: State = {
    createListStep: CreateListStep.list,
    listName: ''
  };

  toggleListDialog() {
    this.props.changeIsAddListDialogOpen(!this.props.isAddListDialogOpen);
  }

  renderNav() {
    const { createListStep } = this.state;

    return (
      <ul className="pt-breadcrumbs">
        <li>
          <Breadcrumb
            text="List"
            onClick={() => console.log('list')}
            className={createListStep === CreateListStep.list ? 'pt-breadcrumb-current' : ''}
          />
        </li>
        <li>
          <Breadcrumb
            text="Entry"
            disabled={createListStep < CreateListStep.entries}
            onClick={() => console.log('Entry')}
            className={createListStep === CreateListStep.entries ? 'pt-breadcrumb-current' : ''}
          />
        </li>
      </ul>
    );
  }

  onCreateListFormComplete(name: string) {
    this.setState({ listName: name, createListStep: CreateListStep.entries });
  }

  renderCreateListForm() {
    const { createListStep } = this.state;

    if (createListStep !== CreateListStep.list) {
      return;
    }

    return (
      <CreateListForm onComplete={(v) => this.onCreateListFormComplete(v)}>
        {this.renderNav()}
      </CreateListForm>
    );
  }

  renderCreateEntriesForm() {
    const { createListStep } = this.state;

    if (createListStep !== CreateListStep.entries) {
      return;
    }

    return (
      <p>wew lad</p>
    );
  }

  render() {
    const { isAddListDialogOpen } = this.props;

    return (
      <Dialog
        isOpen={isAddListDialogOpen}
        onClose={() => this.toggleListDialog()}
        title="New Price List"
        icon="manually-entered-data"
      >
        {this.renderCreateListForm()}
        {this.renderCreateEntriesForm()}
      </Dialog>
    );
  }
}
