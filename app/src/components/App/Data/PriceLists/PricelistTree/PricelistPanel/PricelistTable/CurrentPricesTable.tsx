import * as React from "react";

import { Classes, H4, HTMLTable, Intent, Spinner } from "@blueprintjs/core";

import { IPricelistEntryJson, IPricelistJson } from "@app/api-types/entities";
import { IItemsMap, ItemId } from "@app/api-types/item";
import { IPriceListMap } from "@app/api-types/pricelist";
import { IRealm, IRegion } from "@app/api-types/region";
import { IGetPriceListOptions } from "@app/api/data";
import { Currency } from "@app/components/util";
import { ItemPopoverContainer } from "@app/containers/util/ItemPopover";
import { FetchLevel } from "@app/types/main";
import { didRealmChange, didRegionChange, qualityToColorClass } from "@app/util";

export interface IStateProps {
    items: IItemsMap;
    getPricelistLevel: FetchLevel;
    pricelistMap: IPriceListMap;
    fetchRealmLevel: FetchLevel;
}

export interface IDispatchProps {
    reloadPrices: (opts: IGetPriceListOptions) => void;
}

export interface IOwnProps {
    list: IPricelistJson;
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
        const { reloadPrices, region, realm, getPricelistLevel, list, fetchRealmLevel } = this.props;

        switch (fetchRealmLevel) {
            case FetchLevel.success:
                break;
            default:
                return;
        }

        switch (getPricelistLevel) {
            case FetchLevel.success:
                break;
            default:
                return;
        }

        const previousItemIds = prevProps.list.pricelist_entries.map(v => v.item_id);
        const itemIds = list.pricelist_entries.map(v => v.item_id);
        const newItemIds = itemIds.filter(v => previousItemIds.indexOf(v) === -1);
        const missingItemIds = previousItemIds.filter(v => itemIds.indexOf(v) === -1);
        const shouldReloadPrices =
            didRegionChange(prevProps.region, region) ||
            didRealmChange(prevProps.realm, realm) ||
            prevProps.list.id !== list.id ||
            newItemIds.length > 0 ||
            missingItemIds.length > 0;
        if (!shouldReloadPrices) {
            return;
        }

        reloadPrices({
            itemIds,
            realmSlug: realm.slug,
            regionName: region.name,
        });
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
        const { fetchRealmLevel } = this.props;

        switch (fetchRealmLevel) {
            case FetchLevel.prompted:
            case FetchLevel.fetching:
            case FetchLevel.refetching:
                return <Spinner intent={Intent.PRIMARY} />;
            case FetchLevel.failure:
                return <Spinner intent={Intent.DANGER} value={1} />;
            case FetchLevel.success:
                return this.renderContentWithRealms();
            case FetchLevel.initial:
            default:
                return <Spinner intent={Intent.NONE} value={0} />;
        }
    }

    private renderContentWithRealms() {
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

    private renderEntry(index: number, entry: IPricelistEntryJson) {
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
                <td>{volume.toLocaleString()}</td>
            </tr>
        );
    }
}
