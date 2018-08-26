import * as React from "react";

import {
    Alignment,
    Button,
    ButtonGroup,
    Classes,
    Intent,
    Navbar,
    NavbarGroup,
    Position,
    Spinner,
    Tooltip,
} from "@blueprintjs/core";

import { RealmToggleContainer } from "@app/containers/util/RealmToggle";
import { RegionToggleContainer } from "@app/containers/util/RegionToggle";
import { IProfession, IProfile, IRealm, IRegion, UserLevel } from "@app/types/global";
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
    profile: IProfile | null;
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
            selectedProfession,
            profile,
        } = this.props;

        let canMutateEntry = authLevel === AuthLevel.authenticated && selectedList !== null;
        if (selectedProfession !== null && profile !== null && profile.user.level !== UserLevel.Admin) {
            canMutateEntry = false;
        }

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

    private renderAddListButton() {
        const { changeIsAddListDialogOpen, selectedProfession, authLevel, profile } = this.props;

        let createListText = "List";
        if (selectedProfession !== null) {
            createListText = `${selectedProfession.label} List`;
        }

        if (authLevel === AuthLevel.unauthenticated || profile === null) {
            return <Button icon="plus" text={createListText} disabled={true} />;
        }

        if (selectedProfession !== null && profile.user.level !== UserLevel.Admin) {
            return (
                <Tooltip content="You are not authorized to manage profession pricelists!" position={Position.RIGHT}>
                    <Button icon="plus" text={createListText} disabled={true} />
                </Tooltip>
            );
        }

        return <Button icon="plus" onClick={() => changeIsAddListDialogOpen(true)} text={createListText} />;
    }

    private renderButtons() {
        const { currentRegion, currentRealm } = this.props;

        if (currentRegion === null || currentRealm === null) {
            return <Spinner className={Classes.SMALL} intent={Intent.PRIMARY} />;
        }

        return (
            <>
                {this.renderAddListButton()}
                {this.renderListButtons()}
            </>
        );
    }
}
