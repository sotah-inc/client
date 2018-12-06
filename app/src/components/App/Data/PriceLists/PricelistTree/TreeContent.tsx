import * as React from "react";

import { Classes, Intent, NonIdealState, Spinner } from "@blueprintjs/core";

import { IPricelistJson } from "@app/api-types/entities";
import { IRealm, IRegion } from "@app/api-types/region";
import { LastModified } from "@app/components/util";
import { PricelistPanelContainer } from "@app/containers/App/Data/PriceLists/PricelistTree/PricelistPanel";
import { RealmSummaryPanelContainer } from "@app/containers/App/Data/PriceLists/PricelistTree/TreeContent/RealmSummaryPanel";

export interface IStateProps {
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    selectedList: IPricelistJson | null;
}

export type Props = Readonly<IStateProps>;

export class TreeContent extends React.Component<Props> {
    public render() {
        const { selectedList, currentRealm, currentRegion } = this.props;

        if (currentRealm === null || currentRegion === null) {
            return (
                <NonIdealState
                    title="Loading"
                    icon={<Spinner className={Classes.LARGE} intent={Intent.NONE} value={0} />}
                />
            );
        }

        if (selectedList === null) {
            return <RealmSummaryPanelContainer realm={currentRealm} region={currentRegion} />;
        }

        return (
            <>
                <PricelistPanelContainer list={selectedList} />
                {this.renderLastModified()}
            </>
        );
    }

    private renderLastModified() {
        const { currentRealm } = this.props;

        if (currentRealm === null) {
            return;
        }

        return <LastModified targetDate={new Date(currentRealm.last_modified * 1000)} />;
    }
}
