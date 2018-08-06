import { Alignment, Button, ButtonGroup, Intent, Navbar, NavbarGroup, Spinner } from "@blueprintjs/core";
import * as React from "react";

import RealmToggle from "@app/containers/util/RealmToggle";
import RegionToggle from "@app/containers/util/RegionToggle";
import { IRealm, IRegion } from "@app/types/global";
import { IPricelist } from "@app/types/price-lists";

export interface StateProps {
    currentRegion: IRegion | null;
    currentRealm: IRealm | null;
    isAddListDialogOpen: boolean;
    isAddEntryDialogOpen: boolean;
    selectedList: IPricelist | null;
}

export interface DispatchProps {
    changeIsAddListDialogOpen: (isDialogOpen: boolean) => void;
    changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => void;
    changeIsEditListDialogOpen: (isDialogOpen: boolean) => void;
    changeIsDeleteListDialogOpen: (isDialogOpen: boolean) => void;
}

export interface OwnProps {}

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class ActionBar extends React.Component<Props> {
    public toggleListDialog() {
        this.props.changeIsAddListDialogOpen(!this.props.isAddListDialogOpen);
    }

    public toggleEntryDialog() {
        this.props.changeIsAddEntryDialogOpen(!this.props.isAddEntryDialogOpen);
    }

    public renderListButtons() {
        const { selectedList, changeIsEditListDialogOpen, changeIsDeleteListDialogOpen } = this.props;

        return (
            <>
                <Navbar.Divider />
                <Button
                    icon="plus"
                    onClick={() => this.toggleEntryDialog()}
                    text="Entry"
                    disabled={selectedList === null}
                />
                <Navbar.Divider />
                <ButtonGroup>
                    <Button
                        icon="edit"
                        onClick={() => changeIsEditListDialogOpen(true)}
                        disabled={selectedList === null}
                    />
                    <Button
                        icon="delete"
                        onClick={() => changeIsDeleteListDialogOpen(true)}
                        text="Delete"
                        disabled={selectedList === null}
                    />
                </ButtonGroup>
            </>
        );
    }

    public renderButtons() {
        const { currentRegion, currentRealm } = this.props;

        if (currentRegion === null || currentRealm === null) {
            return <Spinner className="pt-small" intent={Intent.PRIMARY} />;
        }

        return (
            <>
                <Button icon="plus" onClick={() => this.toggleListDialog()} text="List" />
                {this.renderListButtons()}
            </>
        );
    }

    public render() {
        return (
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>{this.renderButtons()}</NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <ButtonGroup>
                        <RealmToggle />
                        <RegionToggle />
                    </ButtonGroup>
                </NavbarGroup>
            </Navbar>
        );
    }
}
