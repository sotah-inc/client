import * as React from "react";

import { Dialog } from "@blueprintjs/core";

import { IPricelistEntryJson, IPricelistJson } from "@app/api-types/entities";
import { IItem } from "@app/api-types/item";
import { CreateEntryFormFormContainer } from "@app/form-containers/App/PriceLists/util/CreateEntryForm";
import { IProfile } from "@app/types/global";
import { FetchLevel } from "@app/types/main";
import { IUpdatePricelistRequestOptions } from "@app/types/price-lists";

export interface IStateProps {
    isAddEntryDialogOpen: boolean;
    updatePricelistLevel: FetchLevel;
    selectedList: IPricelistJson | null;
    profile: IProfile | null;
}

export interface IDispatchProps {
    changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => void;
    updatePricelist: (opts: IUpdatePricelistRequestOptions) => void;
}

export type Props = Readonly<IStateProps & IDispatchProps>;

interface IState {
    entryFormError: string;
}

export class CreateEntryDialog extends React.Component<Props, IState> {
    public state: IState = {
        entryFormError: "",
    };

    public render() {
        const { isAddEntryDialogOpen, updatePricelistLevel, changeIsAddEntryDialogOpen, selectedList } = this.props;
        const { entryFormError } = this.state;

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
                    onComplete={(entry: IPricelistEntryJson) => this.onCreateEntryFormComplete(entry)}
                    onItemSelect={v => this.onCreateEntryFormItemSelect(v)}
                    isSubmitDisabled={updatePricelistLevel === FetchLevel.fetching}
                    externalItemError={entryFormError}
                />
            </Dialog>
        );
    }

    private onCreateEntryFormComplete(entry: IPricelistEntryJson) {
        const { selectedList, updatePricelist, profile } = this.props;
        updatePricelist({
            id: selectedList!.id,
            meta: { isAddEntryDialogOpen: false },
            request: {
                entries: [...selectedList!.pricelist_entries!, entry],
                pricelist: selectedList!,
            },
            token: profile!.token,
        });
    }

    private onCreateEntryFormItemSelect(item: IItem) {
        const { selectedList } = this.props;

        for (const entry of selectedList!.pricelist_entries!) {
            if (entry.item_id === item.id) {
                this.setState({ entryFormError: "Item is already in the list." });

                return;
            }
        }

        this.setState({ entryFormError: "" });
    }
}
