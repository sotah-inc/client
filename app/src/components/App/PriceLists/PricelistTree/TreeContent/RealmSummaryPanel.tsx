import * as React from "react";

import { Callout, Card, Classes, H2, H5, HTMLTable } from "@blueprintjs/core";

import { IGetUnmetDemandRequestOptions } from "@app/api/price-lists";
import { ItemPopoverContainer } from "@app/containers/util/ItemPopover";
import { PricelistIconContainer } from "@app/containers/util/PricelistIcon";
import { IExpansion, IProfessionPricelist, IRealm, IRegion, ItemsMap, RealmPopulation } from "@app/types/global";
import { IPricelistEntry } from "@app/types/price-lists";
import { qualityToColorClass } from "@app/util";

export interface IStateProps {
    expansions: IExpansion[];
    unmetDemandItems: ItemsMap;
    unmetDemandProfessionPricelists: IProfessionPricelist[];
}

export interface IDispatchProps {
    refreshUnmetDemand: (opts: IGetUnmetDemandRequestOptions) => void;
}

export interface IOwnProps {
    realm: IRealm;
    region: IRegion;
}

export type Props = Readonly<IStateProps & IDispatchProps & IOwnProps>;

export class RealmSummaryPanel extends React.Component<Props> {
    public componentDidMount() {
        const { refreshUnmetDemand, expansions, region, realm } = this.props;

        const primaryExpansion = expansions.reduce((previousValue, currentValue) => {
            if (currentValue.primary) {
                return currentValue;
            }

            return previousValue;
        }, expansions[0]);

        refreshUnmetDemand({
            expansion: primaryExpansion.name,
            realm: realm.slug,
            region: region.name,
        });
    }

    public render() {
        const { realm, region, expansions, unmetDemandProfessionPricelists } = this.props;

        const primaryExpansion = expansions.reduce((previousValue, currentValue) => {
            if (currentValue.primary) {
                return currentValue;
            }

            return previousValue;
        }, expansions[0]);

        let population = realm.population;
        if (population === RealmPopulation.na) {
            population = RealmPopulation.high;
        }

        return (
            <>
                <Callout style={{ marginBottom: "10px" }}>
                    <H5>Summary</H5>
                    <p>
                        {region.name.toUpperCase()}-{realm.name}
                        is a <em>{population} population</em> realm
                    </p>
                </Callout>
                <Card>
                    <H5>Unmet Demand for {primaryExpansion.label} Professions</H5>
                    {unmetDemandProfessionPricelists.map((v, i) => this.renderUnmetItemsTable(i, v))}
                </Card>
            </>
        );
    }

    private renderUnmetItemsTable(index: number, professionPricelist: IProfessionPricelist) {
        const { unmetDemandItems } = this.props;

        const entries = professionPricelist.pricelist!.pricelist_entries!.filter(v => v.item_id in unmetDemandItems);

        console.log(professionPricelist.pricelist);

        return (
            <div key={index}>
                <H2 className="pricelist-table-heading">
                    <PricelistIconContainer pricelist={professionPricelist.pricelist!} />
                    {professionPricelist.pricelist!.name}
                </H2>
                <HTMLTable
                    className={`${Classes.HTML_TABLE} ${Classes.HTML_TABLE_BORDERED} ${
                        Classes.SMALL
                    } unmet-items-table`}
                >
                    <thead>
                        <tr>
                            <th>Item</th>
                        </tr>
                    </thead>
                    <tbody>{entries.map((v, i) => this.renderEntry(i, v))}</tbody>
                </HTMLTable>
            </div>
        );
    }

    private renderEntry(index: number, entry: IPricelistEntry) {
        const { unmetDemandItems } = this.props;

        const { item_id, quantity_modifier } = entry;
        const item = unmetDemandItems[item_id];

        return (
            <tr key={index}>
                <td className={qualityToColorClass(item.quality)}>
                    <ItemPopoverContainer
                        item={item}
                        itemTextFormatter={itemText => `${itemText} \u00D7${quantity_modifier}`}
                    />
                </td>
            </tr>
        );
    }
}
