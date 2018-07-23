import * as React from 'react';
import { Button, NonIdealState } from '@blueprintjs/core';

import { Item, Region, Realm } from '@app/types/global';
import { Pricelist } from '@app/types/price-lists';
import { PriceListTable } from '@app/components/App/PriceLists/PriceListPanel/PriceListTable';

export type StateProps = {
  currentRegion: Region | null
  currentRealm: Realm | null
  isAddEntryDialogOpen: boolean
};

export type DispatchProps = {
  changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => void
};

export type OwnProps = {
  list: Pricelist
};

export type FormValues = {
  quantity: number
  item: Item | null
};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class PriceListPanel extends React.Component<Props> {
  toggleDialog() {
    this.props.changeIsAddEntryDialogOpen(!this.props.isAddEntryDialogOpen);
  }

  render() {
    const { list, currentRegion, currentRealm } = this.props;

    if (list.pricelist_entries!.length === 0) {
      return (
        <NonIdealState
          title="No entries"
          description="You have no items to check."
          visual="list"
          action={<Button
            className="pt-fill"
            icon="plus"
            onClick={() => this.toggleDialog()}
            text={`Add Entry to ${list.name}`}
          />}
        />
      );
    }

    return (
      <PriceListTable list={list} region={currentRegion!} realm={currentRealm!} />
    );
  }
}
