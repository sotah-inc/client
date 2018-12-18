import * as React from "react";

import { Intent } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router";

import { ICreatePricelistRequest } from "@app/api-types/contracts/user/pricelist-crud";
import { ICreateProfessionPricelistRequest } from "@app/api-types/contracts/user/profession-pricelists-crud";
import { IPricelistJson } from "@app/api-types/entities";
import { IExpansion } from "@app/api-types/expansion";
import { IItemsMap } from "@app/api-types/item";
import { IProfession } from "@app/api-types/profession";
import { IRealm, IRegion } from "@app/api-types/region";
import { IOnCompleteOptions } from "@app/components/App/Data/PriceLists/util/ListDialog";
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
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    selectedList: IPricelistJson | null;
}

export interface IDispatchProps {
    appendItems: (items: IItemsMap) => void;
    changeIsAddListDialogOpen: (isDialogOpen: boolean) => void;
    createPricelist: (token: string, request: ICreatePricelistRequest) => void;
    createProfessionPricelist: (token: string, request: ICreateProfessionPricelistRequest) => void;
}

export interface IOwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<IStateProps & IDispatchProps & IOwnProps>;

type State = Readonly<{
    listDialogResetTrigger: number;
}>;

export class CreateListDialog extends React.Component<Props, State> {
    public state = {
        listDialogResetTrigger: 0,
    };

    public componentDidUpdate(prevProps: Props) {
        const {
            createPricelistLevel,
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

        if (prevProps.createPricelistLevel !== createPricelistLevel) {
            switch (createPricelistLevel) {
                case FetchLevel.success:
                    AppToaster.show({
                        icon: "info-sign",
                        intent: Intent.SUCCESS,
                        message: "Your pricelist has been created.",
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

    private onListDialogComplete({ name, slug, entries, items }: IOnCompleteOptions) {
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
                pricelist: { name, slug },
            });
        } else {
            createProfessionPricelist(profile!.token, {
                entries,
                expansion_name: selectedExpansion!.name,
                pricelist: { name, slug },
                profession_name: selectedProfession.name,
            });
        }

        appendItems(items);
    }
}
