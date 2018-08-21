import * as React from "react";

import { Classes, HTMLTable, Intent, NonIdealState, Spinner } from "@blueprintjs/core";

import { getPriceList, IPriceListMap } from "@app/api/data";
import { Currency } from "@app/components/util";
import { ItemPopoverContainer } from "@app/containers/util/ItemPopover";
import { IRealm, IRegion, ItemId, ItemsMap } from "@app/types/global";
import { GetPriceListLevel, IPricelist, IPricelistEntry } from "@app/types/price-lists";
import { didRealmChange, didRegionChange, qualityToColorClass } from "@app/util";

export interface IStateProps {
    items: ItemsMap;
}

export interface IOwnProps {
    list: IPricelist;
    region: IRegion;
    realm: IRealm;
}

type Props = Readonly<IStateProps & IOwnProps>;

type State = Readonly<{
    getPriceListLevel: GetPriceListLevel;
    pricelistMap: IPriceListMap;
    itemsMap: ItemsMap;
}>;

export class PriceListTable extends React.Component<Props, State> {
    public state: State = {
        getPriceListLevel: GetPriceListLevel.initial,
        itemsMap: {},
        pricelistMap: {},
    };

    public async componentDidMount() {
        await this.reloadPricelistData();
    }

    public componentDidUpdate(prevProps: Props) {
        const { list, region, realm } = this.props;

        const shouldReloadPricelistData =
            this.props.list.pricelist_entries!.length !== prevProps.list.pricelist_entries!.length ||
            list.id !== prevProps.list.id ||
            didRegionChange(prevProps.region, region) ||
            didRealmChange(prevProps.realm, realm);
        if (shouldReloadPricelistData) {
            this.reloadPricelistData();
        }
    }

    public render() {
        const { getPriceListLevel } = this.state;

        switch (getPriceListLevel) {
            case GetPriceListLevel.failure:
                return (
                    <NonIdealState
                        title="Could not load price-lists"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.DANGER} value={0} />}
                    />
                );
            case GetPriceListLevel.success:
                return this.renderTable();
            case GetPriceListLevel.initial:
            default:
                return (
                    <NonIdealState
                        title="Loading"
                        icon={<Spinner className={Classes.LARGE} intent={Intent.PRIMARY} />}
                    />
                );
        }
    }

    private async reloadPricelistData() {
        const { list, region, realm } = this.props;

        const itemIds = list.pricelist_entries!.map(v => v.item_id);
        const data = await getPriceList({
            itemIds,
            realmSlug: realm.slug,
            regionName: region.name,
        });
        if (data === null) {
            this.setState({ getPriceListLevel: GetPriceListLevel.failure });

            return;
        }

        this.setState({
            getPriceListLevel: GetPriceListLevel.success,
            itemsMap: data.items,
            pricelistMap: data.price_list,
        });
    }

    private renderEntry(index: number, entry: IPricelistEntry) {
        const { pricelistMap } = this.state;
        const { item_id, quantity_modifier } = entry;

        let bid: number = 0;
        let buyout: number = 0;
        if (item_id in pricelistMap) {
            bid = pricelistMap[item_id].bid;
            buyout = pricelistMap[item_id].buyout;
        }

        const item = this.getItem(item_id);
        if (item === null) {
            return (
                <tr key={index}>
                    <td colSpan={3}>
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
            </tr>
        );
    }

    private getItem(itemId: ItemId) {
        const { items } = this.props;
        const { itemsMap } = this.state;

        if (itemId in items) {
            return items[itemId];
        }

        if (itemId in itemsMap) {
            return itemsMap[itemId];
        }

        return null;
    }

    private renderTable() {
        const { list } = this.props;
        const { pricelistMap } = this.state;

        const entries = [...list.pricelist_entries!].sort((a, b) => {
            let aResult = 0;
            if (a.item_id in pricelistMap) {
                aResult = pricelistMap[a.item_id].buyout * a.quantity_modifier;
            }

            let bResult = 0;
            if (b.item_id in pricelistMap) {
                bResult = pricelistMap[b.item_id].buyout * b.quantity_modifier;
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
                        <th>Bid</th>
                        <th>Buyout</th>
                    </tr>
                </thead>
                <tbody>{entries.map((v, i) => this.renderEntry(i, v))}</tbody>
            </HTMLTable>
        );
    }
}
