import * as React from 'react';
import {
  Tab,
  Tabs,
  Button,
  NonIdealState,
  Dialog,
  Navbar,
  NavbarGroup,
  Alignment,
  ButtonGroup
} from '@blueprintjs/core';

import { PriceList, ListCreateLevel } from '@app/types/price-lists';
import PriceListPanel from '@app/containers/App/PriceLists/PriceListPanel';
import CreateListForm from '@app/containers/App/PriceLists/CreateListForm';
import RegionToggle from '@app/containers/util/RegionToggle';
import RealmToggle from '@app/containers/util/RealmToggle';
import { priceListEntryTabId } from '@app/util';

import './PriceLists.scss';

export type StateProps = {
  lists: PriceList[]
  listCreateLevel: ListCreateLevel
  selectedList: PriceList | null
};

export type DispatchProps = {
  changeCreateLevel: (createLevel: ListCreateLevel) => void
  changeSelectedList: (list: PriceList) => void
};

export type OwnProps = {};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

type State = Readonly<{
  isDialogOpen: boolean
}>;

export class PriceLists extends React.Component<Props, State> {
  state: State = {
    isDialogOpen: false
  };

  componentDidUpdate(prevProps: Props) {
    const { listCreateLevel } = this.props;

    if (listCreateLevel !== prevProps.listCreateLevel) {
      switch (listCreateLevel) {
        case ListCreateLevel.success:
          this.setState({ isDialogOpen: false });
          this.props.changeCreateLevel(ListCreateLevel.initial);

          break;
        default:
          break;
      }
    }
  }

  toggleDialog() {
    this.setState({ isDialogOpen: !this.state.isDialogOpen });
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

  renderTabs() {
    const { lists, selectedList } = this.props;

    if (lists.length === 0) {
      return (
        <NonIdealState
          title="No price lists"
          description="You have no price lists."
          visual="list"
          action={<Button className="pt-fill" icon="plus" onClick={() => this.toggleDialog()}>Add List</Button>}
        />
      );
    }

    return (
      <>
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
      </>
    );
  }

  renderContent() {
    return (
      <div style={{marginTop: '20px'}}>
        {this.renderTabs()}
      </div>
    );
  }

  render() {
    return (
      <>
        <Dialog
          isOpen={this.state.isDialogOpen}
          onClose={() => this.toggleDialog()}
          title="New Price List"
          icon="manually-entered-data"
        >
          <CreateListForm />
        </Dialog>
        <Navbar>
          <NavbarGroup align={Alignment.LEFT}>
            <Button
              icon="plus"
              onClick={() => this.toggleDialog()}
              text={'Add List'}
            />
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            <ButtonGroup>
              <RealmToggle />
              <RegionToggle />
            </ButtonGroup>
          </NavbarGroup>
        </Navbar>
        {this.renderContent()}
      </>
    );
  }
}