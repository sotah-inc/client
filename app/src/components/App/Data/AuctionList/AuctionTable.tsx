import * as React from "react";

import { Button, ButtonGroup, Classes, HTMLTable } from "@blueprintjs/core";

import { SortKind } from "@app/api-types";
import { IAuction } from "@app/api-types/auction";
import { IQueryAuctionsItem } from "@app/api-types/contracts/data";
import { IProfessionPricelistJson } from "@app/api-types/entities";
import { IExpansion } from "@app/api-types/expansion";
import { IItem, IItemsMap, ItemId } from "@app/api-types/item";
import { IProfession } from "@app/api-types/profession";
import { Currency, ProfessionIcon } from "@app/components/util";
import { SortToggleContainer } from "@app/containers/App/Data/AuctionList/SortToggle";
import { ItemPopoverContainer } from "@app/containers/util/ItemPopover";
import { PricelistIconContainer } from "@app/containers/util/PricelistIcon";
import { getSelectedResultIndex, qualityToColorClass } from "@app/util";

import "./AuctionTable.scss";

type ListAuction = IAuction | null;

export interface IStateProps {
    auctions: ListAuction[];
    selectedItems: IQueryAuctionsItem[];
    items: IItemsMap;
    relatedProfessionPricelists: IProfessionPricelistJson[];
    expansions: IExpansion[];
    professions: IProfession[];
}

export interface IDispatchProps {
    onAuctionsQuerySelect: (aqResult: IQueryAuctionsItem) => void;
    onAuctionsQueryDeselect: (index: number) => void;
}

type Props = Readonly<IStateProps & IDispatchProps>;

export class AuctionTable extends React.Component<Props> {
    public isResultSelected(result: IQueryAuctionsItem) {
        return this.getSelectedResultIndex(result) > -1;
    }

    public getSelectedResultIndex(result: IQueryAuctionsItem): number {
        const selectedItems = this.props.selectedItems;
        return getSelectedResultIndex(result, selectedItems);
    }

    public onItemClick(item: IItem) {
        const result: IQueryAuctionsItem = {
            item,
            owner: { name: "", normalized_name: "" },
            rank: 0,
            target: "",
        };

        if (this.isResultSelected(result)) {
            this.props.onAuctionsQueryDeselect(this.getSelectedResultIndex(result));

            return;
        }

        this.props.onAuctionsQuerySelect(result);
    }

    public renderItemPopover(item: IItem) {
        return <ItemPopoverContainer item={item} onItemClick={() => this.onItemClick(item)} />;
    }

    public renderAuction(auction: IAuction | null, index: number) {
        const { items } = this.props;

        if (auction === null || !(auction.itemId in items)) {
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

        const item = items[auction.itemId];

        return (
            <React.Fragment key={index}>
                <tr>
                    <td className={qualityToColorClass(item.quality)}>{this.renderItemPopover(item)}</td>
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
                {this.renderRelatedProfessionPricelists(item.id)}
            </React.Fragment>
        );
    }

    public render() {
        const { auctions } = this.props;

        return (
            <HTMLTable
                className={`${Classes.HTML_TABLE} ${Classes.HTML_TABLE_BORDERED} ${Classes.SMALL} auction-table`}
            >
                <thead>
                    <tr>
                        <th>
                            <SortToggleContainer label="Item" sortKind={SortKind.item} />
                        </th>
                        <th>
                            <SortToggleContainer label="Quantity" sortKind={SortKind.quantity} />
                        </th>
                        <th>
                            <SortToggleContainer label="Buyout" sortKind={SortKind.buyout} />
                        </th>
                        <th>
                            <SortToggleContainer label="BuyoutPer" sortKind={SortKind.buyoutPer} />
                        </th>
                        <th>
                            <SortToggleContainer label="Auctions" sortKind={SortKind.auctions} />
                        </th>
                        <th>
                            <SortToggleContainer label="Owner" sortKind={SortKind.owner} />
                        </th>
                    </tr>
                </thead>
                <tbody>{auctions.map((auction, index) => this.renderAuction(auction, index))}</tbody>
            </HTMLTable>
        );
    }

    private renderRelatedProfessionPricelists(itemId: ItemId) {
        const { relatedProfessionPricelists } = this.props;

        const forItem = relatedProfessionPricelists.filter(
            v => v.pricelist.pricelist_entries.filter(y => y.item_id === itemId).length > 0,
        );
        if (forItem.length === 0) {
            return null;
        }

        return forItem.map((v, i) => this.renderProfessionPricelist(i, v));
    }

    private renderProfessionPricelist(index: number, professionPricelist: IProfessionPricelistJson) {
        const { expansions, professions } = this.props;

        const expansion: IExpansion | null = expansions.reduce((prev, v) => {
            if (prev !== null) {
                return prev;
            }

            if (v.name === professionPricelist.expansion) {
                return v;
            }

            return null;
        }, null);
        if (expansion === null) {
            return null;
        }

        const profession: IProfession | null = professions.reduce((prev, v) => {
            if (prev !== null) {
                return prev;
            }

            if (v.name === professionPricelist.name) {
                return v;
            }

            return null;
        }, null);
        if (profession === null) {
            return null;
        }

        const boxShadow: string = index === 0 ? "none" : "inset 0 1px 0 0 rgba(255, 255, 255, 0.15)";

        return (
            <tr className="related-profession-pricelists" key={index}>
                <td colSpan={2} style={{ boxShadow }}>
                    <ButtonGroup>
                        <Button rightIcon="chevron-right" minimal={true} small={true}>
                            <ProfessionIcon profession={profession} /> {profession.label}
                        </Button>
                        <Button rightIcon="chevron-right" minimal={true} small={true}>
                            <span style={{ color: expansion.label_color }}>{expansion.label}</span>
                        </Button>
                        <Button
                            minimal={true}
                            small={true}
                            icon={<PricelistIconContainer pricelist={professionPricelist.pricelist} />}
                        >
                            {professionPricelist.pricelist.name}
                        </Button>
                    </ButtonGroup>
                </td>
                <td style={{ boxShadow: "inset 1px 0 0 0 rgba(255, 255, 255, 0.15)" }}>&nbsp;</td>
                <td style={{ boxShadow: "inset 1px 0 0 0 rgba(255, 255, 255, 0.15)" }}>&nbsp;</td>
                <td style={{ boxShadow: "inset 1px 0 0 0 rgba(255, 255, 255, 0.15)" }}>&nbsp;</td>
                <td style={{ boxShadow: "inset 1px 0 0 0 rgba(255, 255, 255, 0.15)" }}>&nbsp;</td>
            </tr>
        );
    }
}
