import * as React from "react";

import { Dialog } from "@blueprintjs/core";

import { CreateEntryFormFormContainer } from "@app/form-containers/App/PriceLists/util/CreateEntryForm";
import { IProfile } from "@app/types/global";
import {
    IPricelist,
    IPricelistEntry,
    IUpdatePricelistRequestOptions,
    MutatePricelistLevel,
} from "@app/types/price-lists";

export interface IStateProps {
    isAddEntryDialogOpen: boolean;
    updatePricelistLevel: MutatePricelistLevel;
    selectedList: IPricelist | null;
    profile: IProfile | null;
}

export interface IDispatchProps {
    changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => void;
    updatePricelist: (opts: IUpdatePricelistRequestOptions) => void;
}

export type Props = Readonly<IStateProps & IDispatchProps>;

export class CreateEntryDialog extends React.Component<Props> {
    public render() {
        const { isAddEntryDialogOpen, updatePricelistLevel, changeIsAddEntryDialogOpen, selectedList } = this.props;

        if (selectedList === null) {
            return null;
        }

        return (
            <Dialog
                isOpen={isAddEntryDialogOpen}
                onClose={() => changeIsAddEntryDialogOpen(!isAddEntryDialogOpen)}
                title="New Entry"
                icon="manually-entered-data"
                canOutsideClickClose={false}
            >
                <CreateEntryFormFormContainer
                    onComplete={(entry: IPricelistEntry) => this.onCreateEntryFormComplete(entry)}
                    isSubmitDisabled={updatePricelistLevel === MutatePricelistLevel.fetching}
                />
            </Dialog>
        );
    }

    private onCreateEntryFormComplete(entry: IPricelistEntry) {
        const { selectedList, updatePricelist, profile } = this.props;
        updatePricelist({
            meta: { isAddEntryDialogOpen: false },
            request: {
                entries: [...selectedList!.pricelist_entries!, entry],
                pricelist: selectedList!,
                token: profile!.token,
            },
        });
    }
}
