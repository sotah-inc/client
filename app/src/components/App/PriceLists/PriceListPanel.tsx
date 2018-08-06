import * as React from "react";

import { Button, Classes, NonIdealState } from "@blueprintjs/core";

import { PriceListTable } from "@app/components/App/PriceLists/PriceListPanel/PriceListTable";
import { IRealm, IRegion, Item } from "@app/types/global";
import { IPricelist } from "@app/types/price-lists";

export interface IStateProps {
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    isAddEntryDialogOpen: boolean;
}

export interface IDispatchProps {
    changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => void;
}

export interface IOwnProps {
    list: IPricelist;
}

export interface IFormValues {
    quantity: number;
    item: Item | null;
}

export type Props = Readonly<IStateProps & IDispatchProps & IOwnProps>;

export class PriceListPanel extends React.Component<Props> {
    public render() {
        const { list, currentRegion, currentRealm, changeIsAddEntryDialogOpen } = this.props;

        if (list.pricelist_entries!.length === 0) {
            return (
                <NonIdealState
                    title="No entries"
                    description="You have no items to check."
                    icon="list"
                    action={
                        <Button
                            className={Classes.FILL}
                            icon="plus"
                            onClick={() => changeIsAddEntryDialogOpen(true)}
                            text={`Add Entry to ${list.name}`}
                        />
                    }
                />
            );
        }

        return <PriceListTable list={list} region={currentRegion!} realm={currentRealm!} />;
    }
}
