import * as React from 'react';
import { Dialog, NonIdealState, Button } from '@blueprintjs/core';

import { Profile } from '@app/types/global';
import { AuthLevel } from '@app/types/main';
import { PricelistEntry, UpdatePricelistLevel, Pricelist } from '@app/types/price-lists';
import CreateListDialog from '@app/containers/App/PriceLists/CreateListDialog';
import CreateEntryForm from '@app/containers/App/PriceLists/CreateEntryForm';
import ActionBar from '@app/containers/App/PriceLists/ActionBar';
import Listing from '@app/containers/App/PriceLists/Listing';
import { UpdatePricelistRequest } from '@app/api/price-lists';

import './PriceLists.scss';

export type StateProps = {
  isAddEntryDialogOpen: boolean
  authLevel: AuthLevel
  updatePricelistLevel: UpdatePricelistLevel
  selectedList: Pricelist | null
  profile: Profile | null
};

export type DispatchProps = {
  changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => void
  updatePricelist: (request: UpdatePricelistRequest) => void
  changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => void
};

export type OwnProps = {};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class PriceLists extends React.Component<Props> {
  toggleEntryDialog() {
    this.props.changeIsAddEntryDialogOpen(!this.props.isAddEntryDialogOpen);
  }

  onCreateEntryFormComplete(entry: PricelistEntry) {
    const { selectedList, updatePricelist, profile } = this.props;
    updatePricelist({
      token: profile!.token,
      pricelist: selectedList!,
      entries: [
        ...selectedList!.pricelist_entries!,
        entry
      ]
    });
  }

  render() {
    const {
      isAddEntryDialogOpen,
      authLevel,
      changeIsLoginDialogOpen,
      updatePricelistLevel
    } = this.props;

    if (authLevel !== AuthLevel.authenticated) {
      return (
        <NonIdealState
          title="Unauthenticated"
          description="Please log in to use price-lists."
          visual="list"
          action={<Button
            onClick={() => changeIsLoginDialogOpen(true)}
            type="button"
            icon="log-in"
            text="Login"
          />}
        />
      );
    }

    return (
      <>
        <CreateListDialog />
        <Dialog
          isOpen={isAddEntryDialogOpen}
          onClose={() => this.toggleEntryDialog()}
          title="New Entry"
          icon="manually-entered-data"
          canOutsideClickClose={false}
        >
          <CreateEntryForm
            onComplete={(v: PricelistEntry) => this.onCreateEntryFormComplete(v)}
            isSubmitDisabled={updatePricelistLevel === UpdatePricelistLevel.fetching}
          />
        </Dialog>
        <ActionBar />
        <Listing />
      </>
    );
  }
}
