import * as React from 'react';
import { Tab, Tabs, Button } from '@blueprintjs/core';

import { PriceList } from '@app/types/price-lists';

export type StateProps = {
  lists: PriceList[]
};

export type DispatchProps = {};

export type OwnProps = {};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class PriceLists extends React.Component<Props> {
  renderPanel(list: PriceList) {
    return (
      <p>Hello, world!</p>
    );
  }

  renderTab(list: PriceList, index: number) {
    return (
      <Tab
        key={index}
        id={`list-${list.id}`}
        title={list.name}
        panel={this.renderPanel(list)}
      />
    );
  }

  render() {
    const { lists } = this.props;

    return (
      <Tabs id="price-lists" selectedTabId="ayy" vertical={true}>
        <Button className="pt-fill" icon="plus" style={{marginBottom: '10px'}}>Add List</Button>
        <Tabs.Expander />
        {lists.map((v, i) => this.renderTab(v, i))}
      </Tabs>
    );
  }
}