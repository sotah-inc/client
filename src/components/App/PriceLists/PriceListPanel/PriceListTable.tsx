import * as React from 'react';
import { NonIdealState, Spinner, Intent } from '@blueprintjs/core';

import { PriceList, PriceListEntry, GetPriceListLevel } from '@app/types/price-lists';
import { Region, Realm } from '@app/types/global';
import ItemPopover from '@app/containers/util/ItemPopover';
import { Currency } from '@app/components/util';
import { qualityToColorClass } from '@app/util';
import { getPriceList, PriceListMap } from '@app/api/data';

export type StateProps = {};

export type DispatchProps = {};

export type OwnProps = {
  list: PriceList
  region: Region
  realm: Realm
};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

type State = Readonly<{
  getPriceListLevel: GetPriceListLevel
  priceListMap: PriceListMap
}>;

export class PriceListTable extends React.Component<Props, State> {
  state: State = {
    getPriceListLevel: GetPriceListLevel.initial,
    priceListMap: {}
  };

  async reloadPricelistData() {
    const { list, region, realm } = this.props;

    const itemIds = list.entries.map((v) => v.item.id);
    const plMap = await getPriceList({
      regionName: region.name,
      realmSlug: realm.slug,
      itemIds
    });
    if (plMap === null) {
      this.setState({ getPriceListLevel: GetPriceListLevel.failure });

      return;
    }

    this.setState({
      getPriceListLevel: GetPriceListLevel.success,
      priceListMap: plMap.price_list
    });
  }

  async componentDidMount() {
    await this.reloadPricelistData();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.list.entries.length !== prevProps.list.entries.length) {
      this.reloadPricelistData();
    }
  }

  renderEntry(index: number, entry: PriceListEntry) {
    const { item, quantity } = entry;
    const { priceListMap } = this.state;

    if (!(item.id in priceListMap)) {
      return (
        <tr key={index}>
          <td colSpan={3}>
            <Spinner className="pt-small" intent={Intent.WARNING} />
          </td>
        </tr>
      );
    }

    const { bid, buyout } = priceListMap[item.id];

    return (
      <tr key={index}>
        <td className={qualityToColorClass(item.quality)}>
          <ItemPopover
            item={item}
            itemTextFormatter={(itemText) => `${itemText} x${quantity}`}
          />
        </td>
        <td>
          <Currency amount={bid * quantity} />
        </td>
        <td>
          <Currency amount={buyout * quantity} />
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
          {list.entries.map((v, i) => this.renderEntry(i, v))}
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