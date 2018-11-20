import * as React from "react";

import { Intent } from "@blueprintjs/core";

import { ICreatePricelistRequest } from "@app/api-types/contracts/user/pricelist-crud";
import { ICreateProfessionPricelistRequest } from "@app/api-types/contracts/user/profession-pricelists-crud";
import { IExpansion } from "@app/api-types/expansion";
import { IItemsMap } from "@app/api-types/item";
import { IProfession } from "@app/api-types/profession";
import { ListDialogContainer } from "@app/containers/App/Data/PriceLists/util/ListDialog";
import { IErrors, IProfile } from "@app/types/global";
import { FetchLevel } from "@app/types/main";
import { AppToaster } from "@app/util/toasters";

export interface IStateProps {
    isAddListDialogOpen: boolean;
    createPricelistLevel: FetchLevel;
    createPricelistErrors: IErrors;
    profile: IProfile | null;
    selectedProfession: IProfession | null;
    selectedExpansion: IExpansion | null;
}

export interface IDispatchProps {
    appendItems: (items: IItemsMap) => void;
    changeIsAddListDialogOpen: (isDialogOpen: boolean) => void;
    createPricelist: (token: string, request: ICreatePricelistRequest) => void;
    createProfessionPricelist: (token: string, request: ICreateProfessionPricelistRequest) => void;
}

export type Props = Readonly<IStateProps & IDispatchProps>;

type State = Readonly<{
    listDialogResetTrigger: number;
}>;

export class CreateListDialog extends React.Component<Props, State> {
    public state = {
        listDialogResetTrigger: 0,
    };

    public componentDidUpdate(prevProps: Props) {
        const { createPricelistLevel } = this.props;
        const { listDialogResetTrigger } = this.state;

        if (prevProps.createPricelistLevel !== createPricelistLevel) {
            switch (createPricelistLevel) {
                case FetchLevel.success:
                    AppToaster.show({
                        icon: "info-sign",
                        intent: Intent.SUCCESS,
                        message: "Your pricelist has been created.",
                    });
                    this.setState({ listDialogResetTrigger: listDialogResetTrigger + 1 });

                    break;
                default:
                    break;
            }
        }
    }

    public render() {
        const {
            isAddListDialogOpen,
            changeIsAddListDialogOpen,
            createPricelistErrors,
            createPricelistLevel,
            selectedProfession,
        } = this.props;
        const { listDialogResetTrigger } = this.state;

        let dialogTitle = "New Price List";
        if (selectedProfession !== null) {
            dialogTitle = `New ${selectedProfession.label} Price List`;
        }

        return (
            <ListDialogContainer
                isOpen={isAddListDialogOpen}
                onClose={() => changeIsAddListDialogOpen(!isAddListDialogOpen)}
                title={dialogTitle}
                mutationErrors={createPricelistErrors}
                mutatePricelistLevel={createPricelistLevel}
                resetTrigger={listDialogResetTrigger}
                onComplete={v => this.onListDialogComplete(v)}
            />
        );
    }

    private onListDialogComplete({ name, entries, items }) {
        const {
            createPricelist,
            profile,
            appendItems,
            selectedProfession,
            createProfessionPricelist,
            selectedExpansion,
        } = this.props;

        if (selectedProfession === null) {
            createPricelist(profile!.token, {
                entries,
                pricelist: { name },
            });
        } else {
            createProfessionPricelist(profile!.token, {
                entries,
                expansion_name: selectedExpansion!.name,
                pricelist: { name },
                profession_name: selectedProfession.name,
            });
        }

        appendItems(items);
    }
}
