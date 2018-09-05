import * as React from "react";

import { H4 } from "@blueprintjs/core";
import * as moment from "moment";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { IPricelistHistoryMap, ITimestampPricesMap } from "@app/api/data";
import { IRealm, IRegion, ItemId, ItemsMap } from "@app/types/global";
import { currencyToText, getColor, unixTimestampToText } from "@app/util";

export interface IStateProps {
    items: ItemsMap;
    pricelistHistoryMap: IPricelistHistoryMap;
    region: IRegion;
    realm: IRealm;
}

interface ILineItem {
    name: number;
    [key: string]: number;
}

type Props = Readonly<IStateProps>;

export class PricelistHistoryGraph extends React.Component<Props> {
    public render() {
        const { pricelistHistoryMap } = this.props;

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
                <H4>Price History</H4>
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
}
