import * as React from 'react';

import ItemPopover from '@app/containers/util/ItemPopover';
import { Item } from '@app/types/global';
import { PriceListEntry } from '@app/types/price-lists';
import {
  qualityToColorClass,
  getItemIconUrl,
  getItemTextValue
} from '@app/util';

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

  renderItem(item: Item) {
    const iconUrl = getItemIconUrl(item);
    const itemText = getItemTextValue(item);
    if (iconUrl === null) {
      return itemText;
    }

    return (
      <>
        <img src={iconUrl} /> {itemText}
      </>
    );
  }

  renderEntry(index: number, entry: PriceListEntry) {
    const { item, quantity } = entry;

    return (
      <tr key={index}>
        <td className={qualityToColorClass(item.quality)}>
          <ItemPopover item={item} onItemClick={() => { return; }} /><br />
          x{quantity}
        </td>
      </tr>
    );
  }

  render() {
    const { entries } = this.props;

    return (
      <table>
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