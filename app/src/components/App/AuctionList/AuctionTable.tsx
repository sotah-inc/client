import * as React from "react";

import { Currency } from "@app/components/util";
import SortToggle from "@app/containers/App/AuctionList/SortToggle";
import ItemPopover from "@app/containers/util/ItemPopover";

import { IQueryAuctionResult, SortKind } from "@app/types/auction";
import { IAuction, Item } from "@app/types/global";
import { getSelectedResultIndex, qualityToColorClass } from "@app/util";

import "./AuctionTable.scss";

type ListAuction = IAuction | null;

export interface StateProps {
    auctions: ListAuction[];
    selectedItems: IQueryAuctionResult[];
}

export interface DispatchProps {
    onAuctionsQuerySelect: (aqResult: IQueryAuctionResult) => void;
    onAuctionsQueryDeselect: (index: number) => void;
}

export interface OwnProps {}

type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class AuctionTable extends React.Component<Props> {
    public isResultSelected(result: IQueryAuctionResult) {
        return this.getSelectedResultIndex(result) > -1;
    }

    public getSelectedResultIndex(result: IQueryAuctionResult): number {
        const selectedItems = this.props.selectedItems;
        return getSelectedResultIndex(result, selectedItems);
    }

    public onItemClick(item: Item) {
        const result: IQueryAuctionResult = {
            item,
            owner: { name: "" },
            rank: 0,
            target: "",
        };

        if (this.isResultSelected(result)) {
            this.props.onAuctionsQueryDeselect(this.getSelectedResultIndex(result));

            return;
        }

        this.props.onAuctionsQuerySelect(result);
    }

    public renderItemPopover(item: Item) {
        return <ItemPopover item={item} onItemClick={() => this.onItemClick(item)} />;
    }

    public renderAuction(auction: IAuction | null, index: number) {
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
                <td className="currency-container">
                    <Currency amount={auction.buyout} />
                </td>
                <td className="buyout-container">
                    <Currency amount={auction.buyoutPer} />
                </td>
                <td className="auclist-container">{auction.aucList.length}</td>
                <td className="owner-container">{auction.owner}</td>
            </tr>
        );
    }

    public render() {
        const { auctions } = this.props;

        return (
            <table className="pt-html-table pt-html-table-bordered pt-small auction-table">
                <thead>
                    <tr>
                        <th>
                            <SortToggle label="Item" sortKind={SortKind.item} />
                        </th>
                        <th>
                            <SortToggle label="Quantity" sortKind={SortKind.quantity} />
                        </th>
                        <th>
                            <SortToggle label="Buyout" sortKind={SortKind.buyout} />
                        </th>
                        <th>
                            <SortToggle label="BuyoutPer" sortKind={SortKind.buyoutPer} />
                        </th>
                        <th>
                            <SortToggle label="Auctions" sortKind={SortKind.auctions} />
                        </th>
                        <th>
                            <SortToggle label="Owner" sortKind={SortKind.owner} />
                        </th>
                    </tr>
                </thead>
                <tbody>{auctions.map((auction, index) => this.renderAuction(auction, index))}</tbody>
            </table>
        );
    }
}
