import { Button, Dialog, Intent, NonIdealState } from "@blueprintjs/core";
import * as React from "react";

import { IDeletePricelistRequestOptions } from "@app/api/price-lists";
import { DialogActions, DialogBody } from "@app/components/util";
import { ActionBarContainer } from "@app/containers/App/PriceLists/ActionBar";
import { CreateListDialogContainer } from "@app/containers/App/PriceLists/CreateListDialog";
import { ListingContainer } from "@app/containers/App/PriceLists/Listing";
import { CreateEntryFormFormContainer } from "@app/form-containers/App/PriceLists/util/CreateEntryForm";
import { ListFormFormContainer } from "@app/form-containers/App/PriceLists/util/ListForm";
import { IProfile } from "@app/types/global";
import { AuthLevel } from "@app/types/main";
import {
    IPricelist,
    IPricelistEntry,
    IUpdatePricelistRequestOptions,
    UpdatePricelistLevel,
} from "@app/types/price-lists";

import "./PriceLists.scss";

export interface IStateProps {
    isAddEntryDialogOpen: boolean;
    authLevel: AuthLevel;
    updatePricelistLevel: UpdatePricelistLevel;
    selectedList: IPricelist | null;
    profile: IProfile | null;
    isEditListDialogOpen: boolean;
    isDeleteListDialogOpen: boolean;
}

export interface IDispatchProps {
    changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => void;
    updatePricelist: (opts: IUpdatePricelistRequestOptions) => void;
    changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => void;
    changeIsEditListDialogOpen: (isDialogOpen: boolean) => void;
    changeIsDeleteListDialogOpen: (isDialogOpen: boolean) => void;
    deletePricelist: (opts: IDeletePricelistRequestOptions) => void;
}

export type Props = Readonly<IStateProps & IDispatchProps>;

export class PriceLists extends React.Component<Props> {
    public onCreateEntryFormComplete(entry: IPricelistEntry) {
        const { selectedList, updatePricelist, profile } = this.props;
        updatePricelist({
            meta: { isAddEntryDialogOpen: false },
            request: {
                entries: [...selectedList!.pricelist_entries!, entry],
                pricelist: selectedList!,
                token: profile!.token,
            },
        });
    }

    public onEditListFormComplete(name: string) {
        const { selectedList, updatePricelist, profile } = this.props;
        updatePricelist({
            meta: { isEditListDialogOpen: false },
            request: {
                entries: selectedList!.pricelist_entries!,
                pricelist: { ...selectedList!, name },
                token: profile!.token,
            },
        });
    }

    public onDeleteDialogCancel() {
        return () => {
            const { changeIsDeleteListDialogOpen } = this.props;
            changeIsDeleteListDialogOpen(false);
        };
    }

    public onDeleteDialogConfirm() {
        return () => {
            const { selectedList, deletePricelist, profile } = this.props;
            deletePricelist({
                id: selectedList!.id,
                token: profile!.token,
            });
        };
    }

    public renderDeleteListDialog() {
        const { isDeleteListDialogOpen, selectedList, changeIsDeleteListDialogOpen } = this.props;

        if (selectedList === null) {
            return;
        }

        return (
            <Dialog
                isOpen={isDeleteListDialogOpen}
                onClose={() => changeIsDeleteListDialogOpen(isDeleteListDialogOpen)}
                title="Delete List"
                icon="delete"
            >
                <DialogBody>
                    <p>Hello, world!</p>
                </DialogBody>
                <DialogActions>
                    <Button text="Cancel" intent={Intent.NONE} onClick={this.onDeleteDialogCancel()} />
                    <Button
                        type="submit"
                        intent={Intent.DANGER}
                        icon="delete"
                        text={`Delete "${selectedList.name}"`}
                        onClick={this.onDeleteDialogConfirm()}
                    />
                </DialogActions>
            </Dialog>
        );
    }

    public render() {
        const {
            isAddEntryDialogOpen,
            authLevel,
            updatePricelistLevel,
            isEditListDialogOpen,
            selectedList,
            changeIsLoginDialogOpen,
            changeIsAddEntryDialogOpen,
            changeIsEditListDialogOpen,
        } = this.props;

        if (authLevel !== AuthLevel.authenticated) {
            return (
                <NonIdealState
                    title="Unauthenticated"
                    description="Please log in to use price-lists."
                    icon="list"
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
                <CreateListDialogContainer />
                <Dialog
                    isOpen={isAddEntryDialogOpen}
                    onClose={() => changeIsAddEntryDialogOpen(!isAddEntryDialogOpen)}
                    title="New Entry"
                    icon="manually-entered-data"
                    canOutsideClickClose={false}
                >
                    <CreateEntryFormFormContainer
                        onComplete={(entry: IPricelistEntry) => this.onCreateEntryFormComplete(entry)}
                        isSubmitDisabled={updatePricelistLevel === UpdatePricelistLevel.fetching}
                    />
                </Dialog>
                <Dialog
                    isOpen={isEditListDialogOpen}
                    onClose={() => changeIsEditListDialogOpen(!isEditListDialogOpen)}
                    title="Edit List"
                    icon="manually-entered-data"
                >
                    <ListFormFormContainer
                        onComplete={() => changeIsEditListDialogOpen(false)}
                        defaultName={selectedList !== null ? selectedList.name : ""}
                        submitIcon="edit"
                        submitText="Save List"
                    />
                </Dialog>
                {this.renderDeleteListDialog()}
                <ActionBarContainer />
                <ListingContainer />
            </>
        );
    }
}
