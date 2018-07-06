import * as React from 'react';
import { Dialog, Breadcrumb, Button, Intent } from '@blueprintjs/core';

import CreateListForm from '@app/containers/App/PriceLists/CreateListDialog/CreateListForm';
import CreateEntryForm from '@app/containers/App/PriceLists/CreateEntryForm';
import { DialogBody, DialogActions, ItemPopover } from '@app/components/util';
import { ItemClasses, Region, Realm } from '@app/types/global';
import { CreateListStep, PriceListEntry, CreateListCompletion, PriceListOptions } from '@app/types/price-lists';

export type StateProps = {
  isAddListDialogOpen: boolean
  itemClasses: ItemClasses
  currentRegion: Region | null
  currentRealm: Realm | null
};

export type DispatchProps = {
  changeIsAddListDialogOpen: (isDialogOpen: boolean) => void
  createList: (opts: PriceListOptions) => void
};

export type OwnProps = {};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

type State = Readonly<{
  createListStep: CreateListStep
  listName: string
  createListCompletion: CreateListCompletion
  entries: PriceListEntry[]
}>;

export class CreateListDialog extends React.Component<Props, State> {
  state: State = {
    createListStep: CreateListStep.list,
    listName: '',
    createListCompletion: CreateListCompletion.initial,
    entries: []
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
            onClick={() => this.onNavClick(CreateListStep.entry)}
            className={createListCompletion === CreateListCompletion.list ? 'pt-breadcrumb-current' : ''}
          />
        </li>
        <li>
          <Breadcrumb
            text="Finish"
            disabled={createListCompletion < CreateListCompletion.entry}
            onClick={() => this.onNavClick(CreateListStep.finish)}
            className={createListCompletion === CreateListCompletion.entry ? 'pt-breadcrumb-current' : ''}
          />
        </li>
      </ul>
    );
  }

  onCreateListFormComplete(name: string) {
    let createListCompletion = CreateListCompletion.list;
    if (this.state.createListCompletion > createListCompletion)  {
      createListCompletion = this.state.createListCompletion;
    }

    this.setState({
      listName: name,
      createListStep: CreateListStep.entry,
      createListCompletion
    });
  }

  renderCreateListForm() {
    const { createListStep } = this.state;

    if (createListStep !== CreateListStep.list) {
      return;
    }

    return (
      <CreateListForm
        onComplete={(v: string) => this.onCreateListFormComplete(v)}
      >
        {this.renderNav()}
      </CreateListForm>
    );
  }

  onCreateEntryFormComplete(entry: PriceListEntry) {
    this.setState({
      entries: [...this.state.entries, entry],
      createListStep: CreateListStep.finish,
      createListCompletion: CreateListCompletion.entry
    });
  }

  renderCreateEntriesForm() {
    const { createListStep } = this.state;

    if (createListStep !== CreateListStep.entry) {
      return;
    }

    return (
      <CreateEntryForm onComplete={(v: PriceListEntry) => this.onCreateEntryFormComplete(v)}>
        {this.renderNav()}
      </CreateEntryForm>
    );
  }

  renderEntry(index: number, entry: PriceListEntry) {
    const { itemClasses } = this.props;

    return (
      <tr key={index}>
        <td>
          <ItemPopover
            item={entry.item}
            itemClasses={itemClasses}
          />
        </td>
        <td>x{entry.quantity}</td>
      </tr>
    );
  }

  renderFinish() {
    const { createList, currentRegion, currentRealm } = this.props;
    const { createListStep, listName, entries } = this.state;

    if (createListStep !== CreateListStep.finish) {
      return;
    }

    return (
      <>
        <DialogBody>
          {this.renderNav()}
          <table className="pt-html-table pt-html-table-bordered pt-small create-list-dialog-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((v, i) => this.renderEntry(i, v))}
            </tbody>
          </table>
        </DialogBody>
        <DialogActions>
          <Button
            text="Add More Entries"
            intent={Intent.NONE}
            onClick={() => this.setState({ createListStep: CreateListStep.entry })}
            icon="caret-left"
          />
          <Button
            text={`Finish "${listName}"`}
            intent={Intent.PRIMARY}
            onClick={() => {
              createList({
                name: listName,
                entries,
                region: currentRegion!,
                realm: currentRealm!
              });
            }}
            icon="edit"
          />
        </DialogActions>
      </>
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
        {this.renderFinish()}
      </Dialog>
    );
  }
}
