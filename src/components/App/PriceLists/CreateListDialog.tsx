import * as React from 'react';
import { Dialog, Breadcrumb } from '@blueprintjs/core';

import CreateListForm from '@app/containers/App/PriceLists/CreateListDialog/CreateListForm';
import CreateEntryForm from '@app/containers/App/PriceLists/CreateEntryForm';
import { CreateListStep, PriceListEntry, CreateListCompletion } from '@app/types/price-lists';

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
  createListCompletion: CreateListCompletion
}>;

export class CreateListDialog extends React.Component<Props, State> {
  state: State = {
    createListStep: CreateListStep.list,
    listName: '',
    createListCompletion: CreateListCompletion.initial
  };

  toggleListDialog() {
    this.props.changeIsAddListDialogOpen(!this.props.isAddListDialogOpen);
  }

  onNavClick(createListStep: CreateListStep) {
    this.setState({ createListStep });
  }

  renderNav() {
    const { createListCompletion } = this.state;

    return (
      <ul className="pt-breadcrumbs">
        <li>
          <Breadcrumb
            text="List"
            onClick={() => this.onNavClick(CreateListStep.list)}
            className={createListCompletion === CreateListCompletion.initial ? 'pt-breadcrumb-current' : ''}
          />
        </li>
        <li>
          <Breadcrumb
            text="Entry"
            disabled={createListCompletion < CreateListCompletion.list}
            onClick={() => this.onNavClick(CreateListStep.entries)}
            className={createListCompletion === CreateListCompletion.list ? 'pt-breadcrumb-current' : ''}
          />
        </li>
      </ul>
    );
  }

  onCreateListFormComplete(name: string) {
    this.setState({
      listName: name,
      createListStep: CreateListStep.entries,
      createListCompletion: CreateListCompletion.list
    });
  }

  onCreateListFormMount() {
    if (this.state.createListCompletion >= CreateListCompletion.list) {
      this.setState({ createListCompletion: CreateListCompletion.initial });
    }
  }

  renderCreateListForm() {
    const { createListStep } = this.state;

    if (createListStep !== CreateListStep.list) {
      return;
    }

    return (
      <CreateListForm
        onComplete={(v: string) => this.onCreateListFormComplete(v)}
        onMount={() => this.onCreateListFormMount()}
      >
        {this.renderNav()}
      </CreateListForm>
    );
  }

  onCreateEntryFormComplete(entry: PriceListEntry) {
    console.log(entry);
  }

  renderCreateEntriesForm() {
    const { createListStep } = this.state;

    if (createListStep !== CreateListStep.entries) {
      return;
    }

    return (
      <CreateEntryForm onComplete={(v: PriceListEntry) => this.onCreateEntryFormComplete(v)}>
        {this.renderNav()}
      </CreateEntryForm>
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
        canOutsideClickClose={false}
      >
        {this.renderCreateListForm()}
        {this.renderCreateEntriesForm()}
      </Dialog>
    );
  }
}
