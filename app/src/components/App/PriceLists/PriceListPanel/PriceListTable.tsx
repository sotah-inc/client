import * as React from "react";

import { Classes, HTMLTable, Intent, NonIdealState, Spinner } from "@blueprintjs/core";

import { getPriceList, IPriceListMap } from "@app/api/data";
import { Currency } from "@app/components/util";
import { ItemPopoverContainer } from "@app/containers/util/ItemPopover";
import { IRealm, IRegion, ItemsMap } from "@app/types/global";
import { GetPriceListLevel, IPricelist, IPricelistEntry } from "@app/types/price-lists";

export interface IOwnProps {
    list: IPricelist;
    region: IRegion;
    realm: IRealm;
}

type Props = Readonly<IOwnProps>;

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

    public async reloadPricelistData() {
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

    public async componentDidMount() {
        await this.reloadPricelistData();
    }

    public componentDidUpdate(prevProps: Props) {
        if (this.props.list.pricelist_entries!.length !== prevProps.list.pricelist_entries!.length) {
            this.reloadPricelistData();
        }
    }

    public renderEntry(index: number, entry: IPricelistEntry) {
        const { item_id, quantity_modifier } = entry;
        const { pricelistMap, itemsMap } = this.state;

        let bid: number = 0;
        let buyout: number = 0;
        if (item_id in pricelistMap) {
            bid = pricelistMap[item_id].bid;
            buyout = pricelistMap[item_id].buyout;
        }

        if (!(item_id in itemsMap)) {
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
                <td>
                    <ItemPopoverContainer
                        item={itemsMap[item_id]}
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

    public renderTable() {
        const { list } = this.props;

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
                <tbody>{list.pricelist_entries!.map((v, i) => this.renderEntry(i, v))}</tbody>
            </HTMLTable>
        );
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
}
