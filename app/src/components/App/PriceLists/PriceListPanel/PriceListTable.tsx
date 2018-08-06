import * as React from 'react';
import { NonIdealState, Spinner, Intent } from '@blueprintjs/core';

import { IPricelist, IPricelistEntry, GetPriceListLevel } from '@app/types/price-lists';
import { IRegion, IRealm, ItemsMap } from '@app/types/global';
import ItemPopover from '@app/containers/util/ItemPopover';
import { Currency } from '@app/components/util';
import { getPriceList, IPriceListMap } from '@app/api/data';

export type StateProps = {};

export type DispatchProps = {};

export type OwnProps = {
  list: IPricelist
  region: IRegion
  realm: IRealm
};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

type State = Readonly<{
  getPriceListLevel: GetPriceListLevel
  pricelistMap: IPriceListMap
  itemsMap: ItemsMap
}>;

export class PriceListTable extends React.Component<Props, State> {
  state: State = {
    getPriceListLevel: GetPriceListLevel.initial,
    pricelistMap: {},
    itemsMap: {}
  };

  async reloadPricelistData() {
    const { list, region, realm } = this.props;

    const itemIds = list.pricelist_entries!.map((v) => v.item_id);
    const data = await getPriceList({
      regionName: region.name,
      realmSlug: realm.slug,
      itemIds
    });
    if (data === null) {
      this.setState({ getPriceListLevel: GetPriceListLevel.failure });

      return;
    }

    this.setState({
      getPriceListLevel: GetPriceListLevel.success,
      pricelistMap: data.price_list,
      itemsMap: data.items
    });
  }

  async componentDidMount() {
    await this.reloadPricelistData();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.list.pricelist_entries!.length !== prevProps.list.pricelist_entries!.length) {
      this.reloadPricelistData();
    }
  }

  renderEntry(index: number, entry: IPricelistEntry) {
    const { item_id, quantity_modifier } = entry;
    const { pricelistMap, itemsMap } = this.state;

    let bid: number = 0;
    let buyout: number = 0;
    if (item_id in pricelistMap) {
      bid = pricelistMap[item_id].bid;
      buyout = pricelistMap[item_id].buyout;
    }

    if (!(item_id in itemsMap)) {
      return (
        <tr key={index}>
          <td colSpan={3}>
            <Spinner intent={Intent.WARNING} />
          </td>
        </tr>
      );
    }

    return (
      <tr key={index}>
        <td>
          <ItemPopover
            item={itemsMap[item_id]}
            itemTextFormatter={(itemText) => `${itemText} \u00D7${quantity_modifier}`}
          />
        </td>
        <td>
          <Currency amount={bid * quantity_modifier} />
        </td>
        <td>
          <Currency amount={buyout * quantity_modifier} />
        </td>
      </tr>
    );
  }

  renderTable() {
    const { list } = this.props;

    return (
      <table className="pt-html-table pt-html-table-bordered pt-small price-list-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Bid</th>
            <th>Buyout</th>
          </tr>
        </thead>
        <tbody>
          {list.pricelist_entries!.map((v, i) => this.renderEntry(i, v))}
        </tbody>
      </table>
    );
  }

  render() {
    const { getPriceListLevel } = this.state;

    switch (getPriceListLevel) {
      case GetPriceListLevel.failure:
        return (
          <NonIdealState
            title="Could not load price-lists"
            visual={<Spinner className="pt-large" intent={Intent.DANGER} value={0} />}
          />
        );
      case GetPriceListLevel.success:
        return this.renderTable();
      case GetPriceListLevel.initial:
      default:
        return (
          <NonIdealState
            title="Loading"
            visual={<Spinner className="pt-large" intent={Intent.PRIMARY} />}
          />
        );
    }
  }
}
