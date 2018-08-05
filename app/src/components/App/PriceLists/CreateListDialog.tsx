import * as React from 'react';
import { Dialog, Breadcrumb, Button, Intent } from '@blueprintjs/core';

import ListForm from '@app/containers/App/PriceLists/util/ListForm';
import CreateEntryForm from '@app/containers/App/PriceLists/util/CreateEntryForm';
import ItemPopover from '@app/containers/util/ItemPopover';
import { DialogBody, DialogActions, ErrorList } from '@app/components/util';
import { ItemClasses, Region, Realm, Errors, Profile, ItemsMap, Item } from '@app/types/global';
import { CreateListStep, PricelistEntry, CreateListCompletion, CreatePricelistLevel } from '@app/types/price-lists';
import { CreatePricelistRequest } from '@app/api/price-lists';
import { AppToaster } from '@app/util/toasters';

export type StateProps = {
  isAddListDialogOpen: boolean
  itemClasses: ItemClasses
  currentRegion: Region | null
  currentRealm: Realm | null
  createPricelistLevel: CreatePricelistLevel
  createPricelistErrors: Errors
  profile: Profile | null
};

export type DispatchProps = {
  changeIsAddListDialogOpen: (isDialogOpen: boolean) => void
  createPricelist: (token: string, request: CreatePricelistRequest) => void
};

export type OwnProps = {};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

type State = Readonly<{
  createListStep: CreateListStep
  listName: string
  createListCompletion: CreateListCompletion
  entries: PricelistEntry[]
  entriesItems: ItemsMap
}>;

export class CreateListDialog extends React.Component<Props, State> {
  state: State = {
    createListStep: CreateListStep.list,
    listName: '',
    createListCompletion: CreateListCompletion.initial,
    entries: [],
    entriesItems: {}
  };

  componentDidUpdate(prevProps: Props) {
    const { createPricelistLevel } = this.props;

    if (prevProps.createPricelistLevel !== createPricelistLevel) {
      switch (createPricelistLevel) {
        case CreatePricelistLevel.success:
          AppToaster.show({
            message: 'Your pricelist has been created.',
            intent: Intent.SUCCESS,
            icon: 'info-sign'
          });
          this.setState({
            createListStep: CreateListStep.list,
            createListCompletion: CreateListCompletion.initial,
            entries: [],
            listName: '',
            entriesItems: {}
          });

          break;
        default:
          break;
      }
    }
  }

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
      <ListForm
        onComplete={(v: string) => this.onCreateListFormComplete(v)}
        submitIcon="caret-right"
        submitText="Next"
      >
        {this.renderNav()}
      </ListForm>
    );
  }

  onCreateEntryFormComplete(entry: PricelistEntry) {
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
      <CreateEntryForm
        onComplete={(v: PricelistEntry, item: Item) => {
          const entriesItems = this.state.entriesItems;
          entriesItems[item.id] = item;
          this.setState({ entriesItems: { ...entriesItems } });
          this.onCreateEntryFormComplete(v);
        }}
      >
        {this.renderNav()}
      </CreateEntryForm>
    );
  }

  renderEntry(index: number, entry: PricelistEntry) {
    const { entriesItems } = this.state;

    return (
      <tr key={index}>
        <td>
          <ItemPopover item={entriesItems[entry.item_id]} />
        </td>
        <td>x{entry.quantity_modifier}</td>
      </tr>
    );
  }

  renderFinish() {
    const { createListStep, listName, entries } = this.state;
    const {
      createPricelist,
      currentRegion,
      currentRealm,
      createPricelistLevel,
      createPricelistErrors,
      profile
    } = this.props;

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
          <ErrorList errors={createPricelistErrors} />
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
            disabled={createPricelistLevel === CreatePricelistLevel.fetching}
            onClick={() => {
              createPricelist(profile!.token, {
                entries: entries,
                pricelist: { name: listName, region: currentRegion!.name, realm: currentRealm!.slug }
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
