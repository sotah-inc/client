import * as React from "react";

import { Callout, Card, H5 } from "@blueprintjs/core";

import { IGetUnmetDemandRequestOptions } from "@app/api/price-lists";
import { IExpansion, IRealm, IRegion, RealmPopulation } from "@app/types/global";

export interface IStateProps {
    expansions: IExpansion[];
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
        const { realm, region, expansions } = this.props;

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
                </Card>
            </>
        );
    }
}
