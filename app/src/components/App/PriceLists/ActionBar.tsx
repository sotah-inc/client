import * as React from "react";

import { Alignment, Button, ButtonGroup, Classes, Intent, Navbar, NavbarGroup, Spinner } from "@blueprintjs/core";

import { RealmToggleContainer } from "@app/containers/util/RealmToggle";
import { RegionToggleContainer } from "@app/containers/util/RegionToggle";
import { IProfession, IRealm, IRegion } from "@app/types/global";
import { AuthLevel } from "@app/types/main";
import { IPricelist } from "@app/types/price-lists";

export interface IStateProps {
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    isAddListDialogOpen: boolean;
    isAddEntryDialogOpen: boolean;
    selectedList: IPricelist | null;
    selectedProfession: IProfession | null;
    authLevel: AuthLevel;
}

export interface IDispatchProps {
    changeIsAddListDialogOpen: (isDialogOpen: boolean) => void;
    changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => void;
    changeIsEditListDialogOpen: (isDialogOpen: boolean) => void;
    changeIsDeleteListDialogOpen: (isDialogOpen: boolean) => void;
}

export type Props = Readonly<IStateProps & IDispatchProps>;

export class ActionBar extends React.Component<Props> {
    public render() {
        return (
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>{this.renderButtons()}</NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <ButtonGroup>
                        <RealmToggleContainer />
                        <RegionToggleContainer />
                    </ButtonGroup>
                </NavbarGroup>
            </Navbar>
        );
    }

    private renderListButtons() {
        const {
            authLevel,
            selectedList,
            changeIsAddEntryDialogOpen,
            changeIsDeleteListDialogOpen,
            changeIsEditListDialogOpen,
        } = this.props;

        const canMutateEntry = authLevel === AuthLevel.authenticated && selectedList !== null;

        return (
            <>
                <Navbar.Divider />
                <Button
                    icon="plus"
                    onClick={() => changeIsAddEntryDialogOpen(true)}
                    text="Entry"
                    disabled={!canMutateEntry}
                />
                <Navbar.Divider />
                <ButtonGroup>
                    <Button icon="edit" onClick={() => changeIsEditListDialogOpen(true)} disabled={!canMutateEntry} />
                    <Button
                        icon="delete"
                        onClick={() => changeIsDeleteListDialogOpen(true)}
                        text="Delete"
                        disabled={!canMutateEntry}
                    />
                </ButtonGroup>
            </>
        );
    }

    private renderButtons() {
        const { currentRegion, currentRealm, changeIsAddListDialogOpen, selectedProfession, authLevel } = this.props;

        if (currentRegion === null || currentRealm === null) {
            return <Spinner className={Classes.SMALL} intent={Intent.PRIMARY} />;
        }

        let createListText = "List";
        if (selectedProfession !== null) {
            createListText = `${selectedProfession.label} List`;
        }

        return (
            <>
                <Button
                    icon="plus"
                    onClick={() => changeIsAddListDialogOpen(true)}
                    text={createListText}
                    disabled={authLevel !== AuthLevel.authenticated}
                />
                {this.renderListButtons()}
            </>
        );
    }
}
