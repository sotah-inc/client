import * as React from "react";

import { Button, Callout, Dialog, Intent } from "@blueprintjs/core";
import { RouteComponentProps } from "react-router";

import { IPricelistJson } from "@app/api-types/entities";
import { IExpansion } from "@app/api-types/expansion";
import { IProfession } from "@app/api-types/profession";
import { IRealm, IRegion } from "@app/api-types/region";
import { DialogActions, DialogBody } from "@app/components/util";
import { IProfile } from "@app/types/global";
import { FetchLevel } from "@app/types/main";
import { AppToaster } from "@app/util/toasters";

export interface IStateProps {
    selectedList: IPricelistJson | null;
    profile: IProfile | null;
    isDeleteListDialogOpen: boolean;
    deletePricelistLevel: FetchLevel;
    selectedProfession: IProfession | null;
    selectedExpansion: IExpansion | null;
    currentRealm: IRealm | null;
    currentRegion: IRegion | null;
}

export interface IDispatchProps {
    changeIsDeleteListDialogOpen: (isDialogOpen: boolean) => void;
    deletePricelist: (token: string, id: number) => void;
    deleteProfessionPricelist: (token: string, id: number) => void;
}

export interface IOwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<IStateProps & IDispatchProps & IOwnProps>;

export class DeleteListDialog extends React.Component<Props> {
    public componentDidUpdate(prevProps: Props) {
        const {
            deletePricelistLevel,
            currentRegion,
            currentRealm,
            selectedProfession,
            selectedExpansion,
            history,
            selectedList,
        } = this.props;

        if (
            currentRegion === null ||
            currentRealm === null ||
            selectedProfession === null ||
            selectedExpansion === null
        ) {
            return;
        }

        if (prevProps.deletePricelistLevel !== deletePricelistLevel) {
            switch (deletePricelistLevel) {
                case FetchLevel.success:
                    AppToaster.show({
                        icon: "info-sign",
                        intent: Intent.SUCCESS,
                        message: "Your pricelist has been deleted.",
                    });

                    const urlParts = [
                        "data",
                        currentRegion.name,
                        currentRealm.slug,
                        "professions",
                        selectedProfession.name,
                        selectedExpansion.name,
                    ];
                    if (selectedList !== null && selectedList.slug !== null) {
                        urlParts.push(selectedList.slug);
                    }
                    history.replace(`/${urlParts.join("/")}`);

                    return;
                default:
                    return;
            }
        }
    }

    public render() {
        const { isDeleteListDialogOpen, selectedList, changeIsDeleteListDialogOpen, deletePricelistLevel } = this.props;

        if (selectedList === null) {
            return null;
        }

        return (
            <Dialog
                isOpen={isDeleteListDialogOpen}
                onClose={() => changeIsDeleteListDialogOpen(isDeleteListDialogOpen)}
                title="Delete List"
                icon="delete"
            >
                <DialogBody>
                    <Callout intent={Intent.DANGER} icon="info-sign">
                        Are you sure you want to delete "{selectedList.name}"
                    </Callout>
                </DialogBody>
                <DialogActions>
                    <Button text="Cancel" intent={Intent.NONE} onClick={() => this.onDialogCancel()} />
                    <Button
                        type="submit"
                        intent={Intent.DANGER}
                        icon="delete"
                        text={`Delete "${selectedList.name}"`}
                        onClick={() => this.onDialogConfirm()}
                        disabled={deletePricelistLevel === FetchLevel.fetching}
                    />
                </DialogActions>
            </Dialog>
        );
    }

    private onDialogCancel() {
        const { changeIsDeleteListDialogOpen } = this.props;

        changeIsDeleteListDialogOpen(false);
    }

    private onDialogConfirm() {
        const { selectedList, deletePricelist, profile, selectedProfession, deleteProfessionPricelist } = this.props;

        if (profile === null || selectedList === null) {
            return;
        }

        if (selectedProfession === null) {
            deletePricelist(profile.token, selectedList.id);

            return;
        }

        deleteProfessionPricelist(profile.token, selectedList.id);
    }
}
