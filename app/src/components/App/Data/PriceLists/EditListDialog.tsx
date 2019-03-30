import * as React from "react";

import { Intent } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router";

import { IPricelistJson } from "@app/api-types/entities";
import { IExpansion } from "@app/api-types/expansion";
import { IItemsMap } from "@app/api-types/item";
import { IProfession } from "@app/api-types/profession";
import { IRealm, IRegion } from "@app/api-types/region";
import { IOnCompleteOptions } from "@app/components/App/Data/PriceLists/util/ListDialog";
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
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    selectedProfession: IProfession | null;
    selectedExpansion: IExpansion | null;
}

export interface IDispatchProps {
    appendItems: (items: IItemsMap) => void;
    changeIsEditListDialogOpen: (isDialogOpen: boolean) => void;
    updatePricelist: (opts: IUpdatePricelistRequestOptions) => void;
}

export interface IOwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<IStateProps & IDispatchProps & IOwnProps>;

type State = Readonly<{
    listDialogResetTrigger: number;
}>;

export class EditListDialog extends React.Component<Props, State> {
    public state = {
        listDialogResetTrigger: 0,
    };

    public componentDidUpdate(prevProps: Props) {
        const {
            updatePricelistLevel,
            selectedList,
            currentRegion,
            currentRealm,
            selectedProfession,
            selectedExpansion,
            history,
        } = this.props;
        const { listDialogResetTrigger } = this.state;

        if (
            currentRegion === null ||
            currentRealm === null ||
            selectedProfession === null ||
            selectedExpansion === null ||
            selectedList === null
        ) {
            return;
        }

        if (prevProps.updatePricelistLevel !== updatePricelistLevel) {
            switch (updatePricelistLevel) {
                case FetchLevel.success:
                    AppToaster.show({
                        icon: "info-sign",
                        intent: Intent.SUCCESS,
                        message: `"${selectedList.name}" has been saved.`,
                    });
                    this.setState({ listDialogResetTrigger: listDialogResetTrigger + 1 });

                    const url = [
                        "data",
                        currentRegion.name,
                        currentRealm.slug,
                        "professions",
                        selectedProfession.name,
                        selectedExpansion.name,
                        selectedList.slug,
                    ].join("/");
                    history.replace(`/${url}`);

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
                onComplete={(v: IOnCompleteOptions) => this.onListDialogComplete(v)}
            />
        );
    }

    private onListDialogClose() {
        const { changeIsEditListDialogOpen } = this.props;
        const { listDialogResetTrigger } = this.state;

        changeIsEditListDialogOpen(false);
        this.setState({ listDialogResetTrigger: listDialogResetTrigger + 1 });
    }

    private onListDialogComplete({ name, entries, items, slug }: IOnCompleteOptions) {
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
