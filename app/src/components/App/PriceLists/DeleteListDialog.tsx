import * as React from "react";

import { Button, Callout, Dialog, Intent } from "@blueprintjs/core";

import { IDeletePricelistRequestOptions } from "@app/api/price-lists";
import { DialogActions, DialogBody } from "@app/components/util";
import { IProfile } from "@app/types/global";
import { IPricelist } from "@app/types/price-lists";

export interface IStateProps {
    selectedList: IPricelist | null;
    profile: IProfile | null;
    isDeleteListDialogOpen: boolean;
}

export interface IDispatchProps {
    changeIsDeleteListDialogOpen: (isDialogOpen: boolean) => void;
    deletePricelist: (opts: IDeletePricelistRequestOptions) => void;
}

export type Props = Readonly<IStateProps & IDispatchProps>;

export class DeleteListDialog extends React.Component<Props> {
    public render() {
        const { isDeleteListDialogOpen, selectedList, changeIsDeleteListDialogOpen } = this.props;

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
        const { selectedList, deletePricelist, profile } = this.props;
        deletePricelist({
            id: selectedList!.id,
            token: profile!.token,
        });
    }
}
