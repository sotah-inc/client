import * as React from 'react';

import ItemPopover from '@app/containers/util/ItemPopover';
import { PriceListEntry } from '@app/types/price-lists';
import { qualityToColorClass } from '@app/util';

export type StateProps = {};

export type DispatchProps = {};

export type OwnProps = {
  entries: PriceListEntry[]
};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class PriceListTable extends React.Component<Props> {
  componentDidMount() {
    console.log(this.props.entries);
  }

  renderEntry(index: number, entry: PriceListEntry) {
    const { item, quantity } = entry;

    return (
      <tr key={index}>
        <td className={qualityToColorClass(item.quality)}>
          <ItemPopover item={item} /> x{quantity}
        </td>
      </tr>
    );
  }

  render() {
    const { entries } = this.props;

    return (
      <table className="pt-html-table pt-html-table-bordered pt-small price-list-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((v, i) => this.renderEntry(i, v))}
        </tbody>
      </table>
    );
  }
}