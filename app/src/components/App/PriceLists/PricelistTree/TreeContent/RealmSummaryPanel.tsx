import * as React from "react";

import { Callout, Card, Classes, H5, Intent, NonIdealState, Spinner } from "@blueprintjs/core";

import { IExpansion, IRealm, IRegion, RealmPopulation } from "@app/types/global";

export interface IStateProps {
    expansions: IExpansion[];
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
}

export type Props = Readonly<IStateProps>;

export class RealmSummaryPanel extends React.Component<Props> {
    public render() {
        const { currentRealm, currentRegion, expansions } = this.props;

        const primaryExpansion = expansions.reduce((result, v) => {
            if (v.primary) {
                return v;
            }

            return result;
        }, expansions[0]);

        if (currentRealm === null || currentRegion === null) {
            return <NonIdealState title="Loading" icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} />} />;
        }

        let population = currentRealm.population;
        if (population === RealmPopulation.na) {
            population = RealmPopulation.high;
        }

        return (
            <>
                <Callout style={{ marginBottom: "10px" }}>
                    <H5>Summary</H5>
                    <p>
                        {currentRegion.name.toUpperCase()}-{currentRealm.name}
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
