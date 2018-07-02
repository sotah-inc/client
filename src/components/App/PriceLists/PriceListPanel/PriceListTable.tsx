import * as React from 'react';

import ItemPopover from '@app/containers/util/ItemPopover';
import { Currency } from '@app/components/util';
import { PriceList, PriceListEntry } from '@app/types/price-lists';
import { qualityToColorClass } from '@app/util';

export type StateProps = {};

export type DispatchProps = {};

export type OwnProps = {
  list: PriceList
};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class PriceListTable extends React.Component<Props> {
  renderEntry(index: number, entry: PriceListEntry) {
    const { item, quantity } = entry;

    return (
      <tr key={index}>
        <td className={qualityToColorClass(item.quality)}>
          <ItemPopover
            item={item}
            itemTextFormatter={(itemText) => `${itemText} x${quantity}`}
          />
        </td>
        <td>
          <Currency amount={0} />
        </td>
      </tr>
    );
  }

  render() {
    const { list } = this.props;

    return (
      <table className="pt-html-table pt-html-table-bordered pt-small price-list-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {list.entries.map((v, i) => this.renderEntry(i, v))}
        </tbody>
      </table>
    );
  }
}