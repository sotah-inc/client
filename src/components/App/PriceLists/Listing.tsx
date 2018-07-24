import * as React from 'react';
import {
  Tab,
  Tabs,
  Button,
  NonIdealState,
  Spinner,
  Intent
} from '@blueprintjs/core';

import { Region, Realm } from '@app/types/global';
import { Pricelist } from '@app/types/price-lists';
import PriceListPanel from '@app/containers/App/PriceLists/PriceListPanel';
import { priceListEntryTabId } from '@app/util';

export type StateProps = {
  pricelists: Pricelist[]
  selectedList: Pricelist | null
  currentRegion: Region | null
  currentRealm: Realm | null
  isAddListDialogOpen: boolean
};

export type DispatchProps = {
  changeSelectedList: (list: Pricelist) => void
  changeIsAddListDialogOpen: (isDialogOpen: boolean) => void
};

export type OwnProps = {};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class Listing extends React.Component<Props> {
  toggleDialog() {
    this.props.changeIsAddListDialogOpen(!this.props.isAddListDialogOpen);
  }

  renderTab(list: Pricelist, index: number) {
    return (
      <Tab
        key={index}
        id={priceListEntryTabId(list)}
        title={list.name}
        panel={<PriceListPanel list={list} />}
      />
    );
  }

  onTabChange(id: React.ReactText) {
    const list = this.props.pricelists.reduce(
      (result, v) => {
        if (result !== null) {
          return result;
        }

        if (priceListEntryTabId(v) === id.toString()) {
          return v;
        }

        return null;
      },
      null
    );

    if (list === null) {
      return;
    }

    this.props.changeSelectedList(list);
  }

  renderContent() {
    const { pricelists, selectedList, currentRegion, currentRealm } = this.props;

    if (currentRegion === null || currentRealm === null) {
      return (
        <NonIdealState
          title="Loading"
          visual={<Spinner className="pt-large" intent={Intent.PRIMARY} />}
        />
      );
    }

    if (pricelists.length === 0) {
      return (
        <NonIdealState
          title="No price lists"
          description={`You have no price lists in ${currentRealm.name}.`}
          visual="list"
          action={<Button
            className="pt-fill"
            icon="plus"
            onClick={() => this.toggleDialog()}
          >
            Add List to {currentRealm.name}
          </Button>}
        />
      );
    }

    return (
      <Tabs
        id="price-lists"
        className="price-lists"
        selectedTabId={selectedList ? `tab-${selectedList.id}` : ''}
        onChange={(id) => this.onTabChange(id)}
        vertical={true}
        renderActiveTabPanelOnly={true}
      >
        {pricelists.map((v, i) => this.renderTab(v, i))}
      </Tabs>
    );
  }

  render() {
    return (
      <div style={{ marginTop: '20px' }}>
        {this.renderContent()}
      </div>
    );
  }
}
