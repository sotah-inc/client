import * as React from "react";

import { Button, Callout, Dialog, Intent } from "@blueprintjs/core";

import { IPricelistJson } from "@app/api-types/entities";
import { IProfession } from "@app/api-types/profession";
import { DialogActions, DialogBody } from "@app/components/util";
import { IProfile } from "@app/types/global";
import { FetchLevel } from "@app/types/main";

export interface IStateProps {
    selectedList: IPricelistJson | null;
    profile: IProfile | null;
    isDeleteListDialogOpen: boolean;
    deletePricelistLevel: FetchLevel;
    selectedProfession: IProfession | null;
}

export interface IDispatchProps {
    changeIsDeleteListDialogOpen: (isDialogOpen: boolean) => void;
    deletePricelist: (token: string, id: number) => void;
    deleteProfessionPricelist: (token: string, id: number) => void;
}

export type Props = Readonly<IStateProps & IDispatchProps>;

export class DeleteListDialog extends React.Component<Props> {
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

        if (selectedProfession === null) {
            deletePricelist(profile!.token, selectedList!.id);
        }

        deleteProfessionPricelist(profile!.token, selectedList!.id);
    }
}
