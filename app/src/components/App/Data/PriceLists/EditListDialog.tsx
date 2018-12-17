import * as React from "react";

import { Intent } from "@blueprintjs/core";

import { IPricelistJson } from "@app/api-types/entities";
import { IItemsMap } from "@app/api-types/item";
import { ListDialogContainer } from "@app/containers/App/Data/PriceLists/util/ListDialog";
import { IErrors, IProfile } from "@app/types/global";
import { FetchLevel } from "@app/types/main";
import { IUpdatePricelistRequestOptions } from "@app/types/price-lists";
import { AppToaster } from "@app/util/toasters";

export interface IStateProps {
    isEditListDialogOpen: boolean;
    updatePricelistLevel: FetchLevel;
    updatePricelistErrors: IErrors;
    profile: IProfile | null;
    selectedList: IPricelistJson | null;
    items: IItemsMap;
}

export interface IDispatchProps {
    appendItems: (items: IItemsMap) => void;
    changeIsEditListDialogOpen: (isDialogOpen: boolean) => void;
    updatePricelist: (opts: IUpdatePricelistRequestOptions) => void;
}

export type Props = Readonly<IStateProps & IDispatchProps>;

type State = Readonly<{
    listDialogResetTrigger: number;
}>;

export class EditListDialog extends React.Component<Props, State> {
    public state = {
        listDialogResetTrigger: 0,
    };

    public componentDidUpdate(prevProps: Props) {
        const { updatePricelistLevel, selectedList } = this.props;
        const { listDialogResetTrigger } = this.state;

        if (prevProps.updatePricelistLevel !== updatePricelistLevel) {
            switch (updatePricelistLevel) {
                case FetchLevel.success:
                    AppToaster.show({
                        icon: "info-sign",
                        intent: Intent.SUCCESS,
                        message: `"${selectedList!.name}" has been saved.`,
                    });
                    this.setState({ listDialogResetTrigger: listDialogResetTrigger + 1 });

                    break;
                default:
                    break;
            }
        }
    }

    public render() {
        const { isEditListDialogOpen, updatePricelistErrors, updatePricelistLevel, selectedList } = this.props;
        const { listDialogResetTrigger } = this.state;

        if (selectedList === null) {
            return null;
        }

        return (
            <ListDialogContainer
                isOpen={isEditListDialogOpen}
                onClose={() => this.onListDialogClose()}
                title="Edit Price List"
                mutationErrors={updatePricelistErrors}
                mutatePricelistLevel={updatePricelistLevel}
                resetTrigger={listDialogResetTrigger}
                defaultName={selectedList!.name}
                defaultSlug={selectedList!.slug === null ? "" : selectedList.slug!}
                defaultEntries={selectedList.pricelist_entries}
                onComplete={v => this.onListDialogComplete(v)}
            />
        );
    }

    private onListDialogClose() {
        const { changeIsEditListDialogOpen } = this.props;
        const { listDialogResetTrigger } = this.state;

        changeIsEditListDialogOpen(false);
        this.setState({ listDialogResetTrigger: listDialogResetTrigger + 1 });
    }

    private onListDialogComplete({ name, entries, items, slug }) {
        const { updatePricelist, profile, selectedList, appendItems } = this.props;

        updatePricelist({
            id: selectedList!.id,
            meta: { isEditListDialogOpen: false },
            request: { entries, pricelist: { name, slug } },
            token: profile!.token,
        });
        appendItems(items);
    }
}
