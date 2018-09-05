import * as React from "react";

import { Classes, H4, HTMLTable, Intent, Spinner } from "@blueprintjs/core";

import { IPriceListMap } from "@app/api/data";
import { Currency } from "@app/components/util";
import { ItemPopoverContainer } from "@app/containers/util/ItemPopover";
import { IRealm, IRegion, ItemId, ItemsMap } from "@app/types/global";
import { IPricelist, IPricelistEntry } from "@app/types/price-lists";
import { qualityToColorClass } from "@app/util";

export interface IStateProps {
    items: ItemsMap;
    pricelistMap: IPriceListMap;
}

export interface IOwnProps {
    list: IPricelist;
    region: IRegion;
    realm: IRealm;
}

type Props = Readonly<IStateProps & IOwnProps>;

export class PricelistTable extends React.Component<Props> {
    public render() {
        const { list, items, pricelistMap } = this.props;

        const entries = [...list.pricelist_entries!].sort((a, b) => {
            const aItem = items[a.item_id];
            const bItem = items[b.item_id];

            let aResult = 0;
            if (a.item_id in pricelistMap) {
                aResult = pricelistMap[a.item_id].buyout * a.quantity_modifier;
            }

            let bResult = 0;
            if (b.item_id in pricelistMap) {
                bResult = pricelistMap[b.item_id].buyout * b.quantity_modifier;
            }

            if (aResult === bResult && aItem && bItem) {
                return aItem.normalized_name > bItem.normalized_name ? 1 : -1;
            }

            return aResult > bResult ? -1 : 1;
        });

        return (
            <>
                <H4>Current Prices</H4>
                <HTMLTable
                    className={`${Classes.HTML_TABLE} ${Classes.HTML_TABLE_BORDERED} ${Classes.SMALL} price-list-table`}
                >
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Bid</th>
                            <th>Buyout</th>
                            <th>Volume</th>
                        </tr>
                    </thead>
                    <tbody>{entries.map((v, i) => this.renderEntry(i, v))}</tbody>
                </HTMLTable>
            </>
        );
    }

    private getItem(itemId: ItemId) {
        const { items } = this.props;

        if (itemId in items) {
            return items[itemId];
        }

        return null;
    }

    private renderEntry(index: number, entry: IPricelistEntry) {
        const { pricelistMap } = this.props;
        const { item_id, quantity_modifier } = entry;

        let bid: number = 0;
        let buyout: number = 0;
        let volume: number = 0;
        if (item_id in pricelistMap) {
            bid = pricelistMap[item_id].bid;
            buyout = pricelistMap[item_id].buyout;
            volume = pricelistMap[item_id].volume;
        }

        const item = this.getItem(item_id);
        if (item === null) {
            return (
                <tr key={index}>
                    <td colSpan={4}>
                        <Spinner intent={Intent.WARNING} />
                    </td>
                </tr>
            );
        }

        return (
            <tr key={index}>
                <td className={qualityToColorClass(item.quality)}>
                    <ItemPopoverContainer
                        item={item}
                        itemTextFormatter={itemText => `${itemText} \u00D7${quantity_modifier}`}
                    />
                </td>
                <td>
                    <Currency amount={bid * quantity_modifier} />
                </td>
                <td>
                    <Currency amount={buyout * quantity_modifier} />
                </td>
                <td>{volume}</td>
            </tr>
        );
    }
}
