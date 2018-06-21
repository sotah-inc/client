import * as React from 'react';

import SortToggle from '@app/containers/App/AuctionList/SortToggle';
import ItemPopover from '@app/containers/util/ItemPopover';
import { Currency } from '@app/components/util';

import { Auction, Item } from '@app/types/global';
import { SortKind, QueryAuctionResult } from '@app/types/auction';
import { qualityToColorClass, getSelectedResultIndex } from '@app/util';

import './AuctionTable.scss';

type ListAuction = Auction | null;

export type StateProps = {
  auctions: ListAuction[]
  selectedItems: QueryAuctionResult[]
};

export type DispatchProps = {
  onAuctionsQuerySelect: (aqResult: QueryAuctionResult) => void
  onAuctionsQueryDeselect: (index: number) => void
};

export type OwnProps = {};

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class AuctionTable extends React.Component<Props> {
  isResultSelected(result: QueryAuctionResult) {
    return this.getSelectedResultIndex(result) > -1;
  }

  getSelectedResultIndex(result: QueryAuctionResult): number {
    const selectedItems = this.props.selectedItems;
    return getSelectedResultIndex(result, selectedItems);
  }

  onItemClick(item: Item) {
    const result: QueryAuctionResult = {
      item,
      owner: { name: '' },
      rank: 0,
      target: ''
    };
    
    if (this.isResultSelected(result)) {
      this.props.onAuctionsQueryDeselect(this.getSelectedResultIndex(result));

      return;
    }

    this.props.onAuctionsQuerySelect(result);
  }

  renderItemPopover(item: Item) {
    return (
      <ItemPopover item={item} onItemClick={() => this.onItemClick(item)} />
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
        <td className={qualityToColorClass(auction.item.quality)}>{this.renderItemPopover(auction.item)}</td>
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