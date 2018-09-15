import * as React from "react";

import { Classes, H4, HTMLTable, Intent, Spinner } from "@blueprintjs/core";

import { IGetPriceListOptions, IPriceListMap } from "@app/api/data";
import { Currency } from "@app/components/util";
import { ItemPopoverContainer } from "@app/containers/util/ItemPopover";
import { IRealm, IRegion, ItemId, ItemsMap } from "@app/types/global";
import { FetchLevel } from "@app/types/main";
import { IPricelist, IPricelistEntry } from "@app/types/price-lists";
import { didRealmChange, didRegionChange, qualityToColorClass } from "@app/util";

export interface IStateProps {
    items: ItemsMap;
    getPricelistLevel: FetchLevel;
    pricelistMap: IPriceListMap;
}

export interface IDispatchProps {
    reloadPrices: (opts: IGetPriceListOptions) => void;
}

export interface IOwnProps {
    list: IPricelist;
    region: IRegion;
    realm: IRealm;
}

type Props = Readonly<IStateProps & IDispatchProps & IOwnProps>;

export class CurrentPricesTable extends React.Component<Props> {
    public componentDidMount() {
        const { reloadPrices, region, realm, list } = this.props;

        const itemIds = list.pricelist_entries!.map(v => v.item_id);

        reloadPrices({
            itemIds,
            realmSlug: realm.slug,
            regionName: region.name,
        });
    }

    public componentDidUpdate(prevProps: Props) {
        const { reloadPrices, region, realm, getPricelistLevel, list } = this.props;

        const itemIds = list.pricelist_entries!.map(v => v.item_id);

        switch (getPricelistLevel) {
            case FetchLevel.success:
                const shouldReloadPrices =
                    didRegionChange(prevProps.region, region) ||
                    didRealmChange(prevProps.realm, realm) ||
                    prevProps.list.id !== list.id;
                if (shouldReloadPrices) {
                    reloadPrices({
                        itemIds,
                        realmSlug: realm.slug,
                        regionName: region.name,
                    });
                }
            default:
                break;
        }
    }

    public render() {
        return (
            <>
                <H4>Current Prices</H4>
                {this.renderContent()}
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

    private renderContent() {
        const { getPricelistLevel } = this.props;

        switch (getPricelistLevel) {
            case FetchLevel.fetching:
                return <Spinner intent={Intent.PRIMARY} />;
            case FetchLevel.failure:
                return <Spinner intent={Intent.DANGER} value={1} />;
            case FetchLevel.success:
                return this.renderTable();
            case FetchLevel.initial:
            default:
                return <Spinner intent={Intent.NONE} value={1} />;
        }
    }

    private renderTable() {
        const { list, items, pricelistMap } = this.props;

        const entries = [...list.pricelist_entries!].sort((a, b) => {
            const aItem = items[a.item_id];
            const bItem = items[b.item_id];

            let aResult = 0;
            if (a.item_id in pricelistMap) {
                aResult = pricelistMap[a.item_id].min_buyout_per * a.quantity_modifier;
            }

            let bResult = 0;
            if (b.item_id in pricelistMap) {
                bResult = pricelistMap[b.item_id].min_buyout_per * b.quantity_modifier;
            }

            if (aResult === bResult && aItem && bItem) {
                return aItem.normalized_name > bItem.normalized_name ? 1 : -1;
            }

            return aResult > bResult ? -1 : 1;
        });

        return (
            <HTMLTable
                className={`${Classes.HTML_TABLE} ${Classes.HTML_TABLE_BORDERED} ${Classes.SMALL} price-list-table`}
            >
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Buyout</th>
                        <th>Volume</th>
                    </tr>
                </thead>
                <tbody>{entries.map((v, i) => this.renderEntry(i, v))}</tbody>
            </HTMLTable>
        );
    }

    private renderEntry(index: number, entry: IPricelistEntry) {
        const { pricelistMap } = this.props;
        const { item_id, quantity_modifier } = entry;

        let buyout: number = 0;
        let volume: number = 0;
        if (item_id in pricelistMap) {
            buyout = pricelistMap[item_id].min_buyout_per;
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
                    <Currency amount={buyout * quantity_modifier} />
                </td>
                <td>{volume}</td>
            </tr>
        );
    }
}
