import { Button, NonIdealState } from "@blueprintjs/core";
import * as React from "react";

import { PriceListTable } from "@app/components/App/PriceLists/PriceListPanel/PriceListTable";
import { IRealm, IRegion, Item } from "@app/types/global";
import { IPricelist } from "@app/types/price-lists";

export interface StateProps {
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    isAddEntryDialogOpen: boolean;
}

export interface DispatchProps {
    changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => void;
}

export interface OwnProps {
    list: IPricelist;
}

export interface FormValues {
    quantity: number;
    item: Item | null;
}

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class PriceListPanel extends React.Component<Props> {
    public toggleDialog() {
        this.props.changeIsAddEntryDialogOpen(!this.props.isAddEntryDialogOpen);
    }

    public render() {
        const { list, currentRegion, currentRealm } = this.props;

        if (list.pricelist_entries!.length === 0) {
            return (
                <NonIdealState
                    title="No entries"
                    description="You have no items to check."
                    visual="list"
                    action={
                        <Button
                            className="pt-fill"
                            icon="plus"
                            onClick={() => this.toggleDialog()}
                            text={`Add Entry to ${list.name}`}
                        />
                    }
                />
            );
        }

        return <PriceListTable list={list} region={currentRegion!} realm={currentRealm!} />;
    }
}
