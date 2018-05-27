import * as React from 'react';

import SortToggle from '@app/containers/App/AuctionList/SortToggle';

import { Auction, Item } from '@app/types/global';
import { SortKind } from '@app/types/auction';
import { Currency } from '../../util';
import { qualityToColorClass, getItemIconUrl, getItemTextValue } from '@app/util';

type ListAuction = Auction | null;

export type StateProps = {
  auctions: ListAuction[]
};

export type DispatchProps = {
};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class AuctionTable extends React.Component<Props> {
  renderItem(item: Item) {
    const itemText = getItemTextValue(item);
    const itemIconUrl = getItemIconUrl(item);
    if (itemIconUrl === null) {
      return itemText;
    }

    return (
      <div className="item-icon-container">
        <img src={itemIconUrl} className="item-icon" /> {itemText}
      </div>
    );
  }

  renderAuction(auction: Auction | null, index: number) {
    if (auction === null) {
      return (
        <tr key={index}>
          <td>---</td>
          <td>---</td>
          <td>---</td>
          <td>---</td>
          <td>---</td>
          <td>---</td>
        </tr>
      );
    }

    return (
      <tr key={index}>
        <td className={qualityToColorClass(auction.item.quality)}>{this.renderItem(auction.item)}</td>
        <td className="quantity-container">{auction.quantity}</td>
        <td className="currency-container"><Currency amount={auction.buyout} /></td>
        <td className="buyout-container"><Currency amount={auction.buyoutPer} /></td>
        <td className="auclist-container">{auction.aucList.length}</td>
        <td className="owner-container">{auction.owner}</td>
      </tr>
    );
  }

  render() {
    const { auctions } = this.props;

    return (
      <table className="pt-html-table pt-html-table-bordered pt-small auction-list">
        <thead>
          <tr>
            <th><SortToggle label="Item" sortKind={SortKind.item} /></th>
            <th><SortToggle label="Quantity" sortKind={SortKind.quantity} /></th>
            <th><SortToggle label="Buyout" sortKind={SortKind.buyout} /></th>
            <th><SortToggle label="BuyoutPer" sortKind={SortKind.buyoutPer} /></th>
            <th><SortToggle label="Auctions" sortKind={SortKind.auctions} /></th>
            <th><SortToggle label="Owner" sortKind={SortKind.owner} /></th>
          </tr>
        </thead>
        <tbody>
          {auctions.map((auction, index) => this.renderAuction(auction, index))}
        </tbody>
      </table>
    );
  }
}