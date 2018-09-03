import * as React from "react";

import { Classes, H2, HTMLTable, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import * as moment from "moment";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import {
    getPriceList,
    getPriceListHistory,
    IPricelistHistoryMap,
    IPriceListMap,
    ITimestampPricesMap,
} from "@app/api/data";
import { Currency } from "@app/components/util";
import { ItemPopoverContainer } from "@app/containers/util/ItemPopover";
import { PricelistIconContainer } from "@app/containers/util/PricelistIcon";
import { IRealm, IRegion, ItemId, ItemsMap } from "@app/types/global";
import { GetPriceListLevel, IPricelist, IPricelistEntry } from "@app/types/price-lists";
import {
    currencyToText,
    didRealmChange,
    didRegionChange,
    getColor,
    qualityToColorClass,
    unixTimestampToText,
} from "@app/util";

export interface IStateProps {
    items: ItemsMap;
}

export interface IOwnProps {
    list: IPricelist;
    region: IRegion;
    realm: IRealm;
}

interface ILineItem {
    name: number;
    [key: string]: number;
}

type Props = Readonly<IStateProps & IOwnProps>;

type State = Readonly<{
    getPriceListLevel: GetPriceListLevel;
    pricelistMap: IPriceListMap;
    pricelistHistoryMap: IPricelistHistoryMap;
    itemsMap: ItemsMap;
}>;

export class PricelistTable extends React.Component<Props, State> {
    public state: State = {
        getPriceListLevel: GetPriceListLevel.initial,
        itemsMap: {},
        pricelistHistoryMap: {},
        pricelistMap: {},
    };

    public async componentDidMount() {
        const { region, realm } = this.props;
        if (region === null || realm === null) {
            return;
        }

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

        const pricelistData = await getPriceList({
            itemIds,
            realmSlug: realm.slug,
            regionName: region.name,
        });
        if (pricelistData === null) {
            this.setState({ getPriceListLevel: GetPriceListLevel.failure });

            return;
        }

        const pricelistHistoryData = await getPriceListHistory({
            itemIds,
            realmSlug: realm.slug,
            regionName: region.name,
        });
        if (pricelistHistoryData === null) {
            this.setState({ getPriceListLevel: GetPriceListLevel.failure });

            return;
        }

        this.setState({
            getPriceListLevel: GetPriceListLevel.success,
            itemsMap: { ...pricelistData.items },
            pricelistHistoryMap: { ...pricelistHistoryData.history },
            pricelistMap: { ...pricelistData.price_list },
        });
    }

    private renderEntry(index: number, entry: IPricelistEntry) {
        const { pricelistMap } = this.state;
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

    private renderLine(index: number, itemId: ItemId) {
        let name: string = itemId.toString();
        const item = this.getItem(itemId);
        if (item !== null) {
            name = item.name;
        }

        return (
            <Line
                key={index}
                name={name}
                dataKey={`${itemId}_buyout`}
                stroke={getColor(index)}
                dot={false}
                animationEasing={"ease-in-out"}
                animationDuration={500}
            />
        );
    }

    private renderLines(data: IPricelistHistoryMap) {
        return Object.keys(data).map((itemIdKey: string, index: number) => this.renderLine(index, Number(itemIdKey)));
    }

    private renderTable() {
        const { list, items } = this.props;
        const { pricelistMap, pricelistHistoryMap } = this.state;

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

        const data: ILineItem[] = Object.keys(pricelistHistoryMap).reduce(
            (dataPreviousValue: ILineItem[], itemIdKey: string) => {
                const itemPricelistHistory: ITimestampPricesMap = pricelistHistoryMap[itemIdKey];
                const itemId = Number(itemIdKey);

                return Object.keys(itemPricelistHistory).reduce((previousValue: ILineItem[], unixTimestampKey) => {
                    const unixTimestamp = Number(unixTimestampKey);
                    const prices = itemPricelistHistory[unixTimestamp];

                    previousValue.push({ name: unixTimestamp, [`${itemId}_buyout`]: prices.buyout / 10 / 10 });

                    return previousValue;
                }, dataPreviousValue);
            },
            [],
        );

        const twoWeeksAgoDate = moment().subtract(14, "days");
        const roundedTwoWeeksAgoDate = moment()
            .subtract(16, "days")
            .subtract(twoWeeksAgoDate.hours(), "hours")
            .subtract(twoWeeksAgoDate.minutes(), "minutes")
            .subtract(twoWeeksAgoDate.seconds(), "seconds");
        const nowDate = moment().add(1, "days");
        const roundedNowDate = moment()
            .add(1, "days")
            .subtract(nowDate.hours(), "hours")
            .subtract(nowDate.minutes(), "minutes")
            .subtract(nowDate.seconds(), "seconds")
            .add(12, "hours");

        const ticks = Array.from(Array(9)).map((_, i) => {
            return roundedTwoWeeksAgoDate.unix() + i * 60 * 60 * 24 * 2;
        });

        return (
            <>
                <H2 className="pricelist-table-heading">
                    <PricelistIconContainer pricelist={list} />
                    {list.name}
                </H2>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data}>
                        <CartesianGrid vertical={false} strokeWidth={0.25} strokeOpacity={0.25} />
                        <XAxis
                            dataKey="name"
                            tickFormatter={unixTimestampToText}
                            domain={[roundedTwoWeeksAgoDate.unix(), roundedNowDate.unix()]}
                            type="number"
                            ticks={ticks}
                            tick={{ fill: "#fff" }}
                        />
                        <YAxis
                            tickFormatter={v => currencyToText(v * 10 * 10)}
                            domain={[
                                dataMin => {
                                    const result = Math.pow(10, Math.floor(Math.log10(dataMin)));
                                    if (result === 0) {
                                        return 10;
                                    }

                                    return result;
                                },
                                dataMax => Math.pow(10, Math.ceil(Math.log10(dataMax)) + 1),
                            ]}
                            tick={{ fill: "#fff" }}
                            scale="log"
                            allowDataOverflow={true}
                            mirror={true}
                        />
                        <Legend />
                        {this.renderLines(pricelistHistoryMap)}
                    </LineChart>
                </ResponsiveContainer>
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
}
