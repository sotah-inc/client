import { Button, Dialog, Intent, NonIdealState } from "@blueprintjs/core";
import * as React from "react";

import { IDeletePricelistRequestOptions } from "@app/api/price-lists";
import { DialogActions, DialogBody } from "@app/components/util";
import ActionBar from "@app/containers/App/PriceLists/ActionBar";
import CreateListDialog from "@app/containers/App/PriceLists/CreateListDialog";
import Listing from "@app/containers/App/PriceLists/Listing";
import CreateEntryForm from "@app/containers/App/PriceLists/util/CreateEntryForm";
import ListForm from "@app/containers/App/PriceLists/util/ListForm";
import { IProfile } from "@app/types/global";
import { AuthLevel } from "@app/types/main";
import {
    IPricelist,
    IPricelistEntry,
    IUpdatePricelistRequestOptions,
    UpdatePricelistLevel,
} from "@app/types/price-lists";

import "./PriceLists.scss";

export interface StateProps {
    isAddEntryDialogOpen: boolean;
    authLevel: AuthLevel;
    updatePricelistLevel: UpdatePricelistLevel;
    selectedList: IPricelist | null;
    profile: IProfile | null;
    isEditListDialogOpen: boolean;
    isDeleteListDialogOpen: boolean;
}

export interface DispatchProps {
    changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => void;
    updatePricelist: (opts: IUpdatePricelistRequestOptions) => void;
    changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => void;
    changeIsEditListDialogOpen: (isDialogOpen: boolean) => void;
    changeIsDeleteListDialogOpen: (isDialogOpen: boolean) => void;
    deletePricelist: (opts: IDeletePricelistRequestOptions) => void;
}

export interface OwnProps {}

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class PriceLists extends React.Component<Props> {
    public toggleEntryDialog() {
        this.props.changeIsAddEntryDialogOpen(!this.props.isAddEntryDialogOpen);
    }

    public toggleEditListDialog() {
        this.props.changeIsEditListDialogOpen(!this.props.isEditListDialogOpen);
    }

    public toggleDeleteListDialog() {
        this.props.changeIsDeleteListDialogOpen(!this.props.isDeleteListDialogOpen);
    }

    public onCreateEntryFormComplete(entry: IPricelistEntry) {
        const { selectedList, updatePricelist, profile } = this.props;
        updatePricelist({
            request: {
                token: profile!.token,
                pricelist: selectedList!,
                entries: [...selectedList!.pricelist_entries!, entry],
            },
            meta: { isAddEntryDialogOpen: false },
        });
    }

    public onEditListFormComplete(name: string) {
        const { selectedList, updatePricelist, profile } = this.props;
        updatePricelist({
            request: {
                token: profile!.token,
                pricelist: { ...selectedList!, name },
                entries: selectedList!.pricelist_entries!,
            },
            meta: { isEditListDialogOpen: false },
        });
    }

    public renderDeleteListDialog() {
        const {
            isDeleteListDialogOpen,
            selectedList,
            changeIsDeleteListDialogOpen,
            deletePricelist,
            profile,
        } = this.props;

        if (selectedList === null) {
            return;
        }

        return (
            <Dialog
                isOpen={isDeleteListDialogOpen}
                onClose={() => this.toggleDeleteListDialog()}
                title="Delete List"
                icon="delete"
            >
                <DialogBody>
                    <p>Hello, world!</p>
                </DialogBody>
                <DialogActions>
                    <Button text="Cancel" intent={Intent.NONE} onClick={() => changeIsDeleteListDialogOpen(false)} />
                    <Button
                        type="submit"
                        intent={Intent.DANGER}
                        icon="delete"
                        text={`Delete "${selectedList.name}"`}
                        onClick={() => {
                            deletePricelist({
                                token: profile!.token,
                                id: selectedList.id,
                            });
                        }}
                    />
                </DialogActions>
            </Dialog>
        );
    }

    public render() {
        const {
            isAddEntryDialogOpen,
            authLevel,
            changeIsLoginDialogOpen,
            updatePricelistLevel,
            isEditListDialogOpen,
            selectedList,
        } = this.props;

        if (authLevel !== AuthLevel.authenticated) {
            return (
                <NonIdealState
                    title="Unauthenticated"
                    description="Please log in to use price-lists."
                    visual="list"
                    action={
                        <Button
                            onClick={() => changeIsLoginDialogOpen(true)}
                            type="button"
                            icon="log-in"
                            text="Login"
                        />
                    }
                />
            );
        }

        return (
            <>
                <CreateListDialog />
                <Dialog
                    isOpen={isAddEntryDialogOpen}
                    onClose={() => this.toggleEntryDialog()}
                    title="New Entry"
                    icon="manually-entered-data"
                    canOutsideClickClose={false}
                >
                    <CreateEntryForm
                        onComplete={(v: IPricelistEntry) => this.onCreateEntryFormComplete(v)}
                        isSubmitDisabled={updatePricelistLevel === UpdatePricelistLevel.fetching}
                    />
                </Dialog>
                <Dialog
                    isOpen={isEditListDialogOpen}
                    onClose={() => this.toggleEditListDialog()}
                    title="Edit List"
                    icon="manually-entered-data"
                >
                    <ListForm
                        onComplete={(name: string) => this.onEditListFormComplete(name)}
                        defaultName={selectedList !== null ? selectedList.name : ""}
                        submitIcon="edit"
                        submitText="Save List"
                    />
                </Dialog>
                {this.renderDeleteListDialog()}
                <ActionBar />
                <Listing />
            </>
        );
    }
}
