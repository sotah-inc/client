import * as React from "react";

import { LastModified } from "@app/components/util";
import { PricelistPanelContainer } from "@app/containers/App/PriceLists/PricelistTree/PricelistPanel";
import { RealmSummaryPanelContainer } from "@app/containers/App/PriceLists/PricelistTree/TreeContent/RealmSummaryPanel";
import { IRealm } from "@app/types/global";
import { IPricelist } from "@app/types/price-lists";

export interface IStateProps {
    currentRealm: IRealm | null;
    selectedList: IPricelist | null;
}

export type Props = Readonly<IStateProps>;

export class TreeContent extends React.Component<Props> {
    public render() {
        const { selectedList } = this.props;

        if (selectedList === null) {
            return <RealmSummaryPanelContainer />;
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
