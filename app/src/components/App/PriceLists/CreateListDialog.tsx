import * as React from "react";

import { Intent } from "@blueprintjs/core";

import { ICreatePricelistRequest } from "@app/api/price-lists";
import { ListDialog } from "@app/components/App/PriceLists/util/ListDialog";
import { IErrors, IProfile, IRealm, IRegion, ItemsMap } from "@app/types/global";
import { CreateListCompletion, CreateListStep, IPricelistEntry, MutatePricelistLevel } from "@app/types/price-lists";
import { AppToaster } from "@app/util/toasters";

export interface IStateProps {
    isAddListDialogOpen: boolean;
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    createPricelistLevel: MutatePricelistLevel;
    createPricelistErrors: IErrors;
    profile: IProfile | null;
}

export interface IDispatchProps {
    changeIsAddListDialogOpen: (isDialogOpen: boolean) => void;
    createPricelist: (token: string, request: ICreatePricelistRequest) => void;
}

export type Props = Readonly<IStateProps & IDispatchProps>;

type State = Readonly<{
    createListStep: CreateListStep;
    listName: string;
    createListCompletion: CreateListCompletion;
    entries: IPricelistEntry[];
    entriesItems: ItemsMap;
}>;

export class CreateListDialog extends React.Component<Props, State> {
    public state = {
        createListCompletion: CreateListCompletion.initial,
        createListStep: CreateListStep.list,
        entries: [],
        entriesItems: {},
        listName: "",
    };

    public componentDidUpdate(prevProps: Props) {
        const { createPricelistLevel } = this.props;

        if (prevProps.createPricelistLevel !== createPricelistLevel) {
            switch (createPricelistLevel) {
                case MutatePricelistLevel.success:
                    AppToaster.show({
                        icon: "info-sign",
                        intent: Intent.SUCCESS,
                        message: "Your pricelist has been created.",
                    });
                    this.setState({
                        createListCompletion: CreateListCompletion.initial,
                        createListStep: CreateListStep.list,
                        entries: [],
                        entriesItems: {},
                        listName: "",
                    });

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
            createPricelist,
            profile,
            currentRegion,
            currentRealm,
        } = this.props;

        return (
            <ListDialog
                isOpen={isAddListDialogOpen}
                onClose={() => changeIsAddListDialogOpen(!isAddListDialogOpen)}
                title="New Price List"
                mutationErrors={createPricelistErrors}
                mutatePricelistLevel={createPricelistLevel}
                onComplete={({ name, entries }) => {
                    createPricelist(profile!.token, {
                        entries,
                        pricelist: { name, region: currentRegion!.name, realm: currentRealm!.slug },
                    });
                }}
            />
        );
    }
}
