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
import { PriceList, ListCreateLevel } from '@app/types/price-lists';
import PriceListPanel from '@app/containers/App/PriceLists/PriceListPanel';
import { priceListEntryTabId } from '@app/util';

export type StateProps = {
  lists: PriceList[]
  listCreateLevel: ListCreateLevel
  selectedList: PriceList | null
  currentRegion: Region | null
  currentRealm: Realm | null
  isAddListDialogOpen: boolean
};

export type DispatchProps = {
  changeCreateLevel: (createLevel: ListCreateLevel) => void
  changeSelectedList: (list: PriceList) => void
  changeIsAddListDialogOpen: (isDialogOpen: boolean) => void
};

export type OwnProps = {};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class Listing extends React.Component<Props> {
  componentDidUpdate(prevProps: Props) {
    const { listCreateLevel, changeIsAddListDialogOpen, changeCreateLevel } = this.props;

    if (listCreateLevel !== prevProps.listCreateLevel) {
      switch (listCreateLevel) {
        case ListCreateLevel.success:
          changeIsAddListDialogOpen(false);
          changeCreateLevel(ListCreateLevel.initial);

          break;
        default:
          break;
      }
    }
  }

  toggleDialog() {
    this.props.changeIsAddListDialogOpen(!this.props.isAddListDialogOpen);
  }

  renderTab(list: PriceList, index: number) {
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
    const list = this.props.lists.reduce(
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
    const { lists, selectedList, currentRegion, currentRealm } = this.props;

    if (currentRegion === null || currentRealm === null) {
      return (
        <NonIdealState
          title="Loading"
          visual={<Spinner className="pt-large" intent={Intent.PRIMARY} />}
        />
      );
    }

    if (lists.length === 0) {
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
        {lists.map((v, i) => this.renderTab(v, i))}
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
