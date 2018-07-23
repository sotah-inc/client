import * as React from 'react';
import {
  Button,
  Navbar,
  NavbarGroup,
  Alignment,
  ButtonGroup,
  Spinner,
  Intent
} from '@blueprintjs/core';

import { Region, Realm } from '@app/types/global';
import { AuthLevel } from '@app/types/main';
import { Pricelist } from '@app/types/price-lists';
import RegionToggle from '@app/containers/util/RegionToggle';
import RealmToggle from '@app/containers/util/RealmToggle';

export type StateProps = {
  currentRegion: Region | null
  currentRealm: Realm | null
  isAddListDialogOpen: boolean
  isAddEntryDialogOpen: boolean
  selectedList: Pricelist | null
  authLevel: AuthLevel
  isLoginDialogOpen: boolean
};

export type DispatchProps = {
  changeIsAddListDialogOpen: (isDialogOpen: boolean) => void
  changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => void
  changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => void
};

export type OwnProps = {};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class ActionBar extends React.Component<Props> {
  toggleListDialog() {
    this.props.changeIsAddListDialogOpen(!this.props.isAddListDialogOpen);
  }

  toggleEntryDialog() {
    this.props.changeIsAddEntryDialogOpen(!this.props.isAddEntryDialogOpen);
  }

  renderButtons() {
    const {
      currentRegion,
      currentRealm,
      selectedList,
      authLevel,
      changeIsLoginDialogOpen,
      isLoginDialogOpen
    } = this.props;

    if (currentRegion === null || currentRealm === null) {
      return (
        <Spinner className="pt-small" intent={Intent.PRIMARY} />
      );
    }

    return (
      <>
        <Button
          icon="plus"
          onClick={() => {
            if (authLevel !== AuthLevel.authenticated) {
              changeIsLoginDialogOpen(!isLoginDialogOpen);

              return;
            }

            this.toggleListDialog();
          }}
          text="List"
        />
        <Navbar.Divider />
        <Button
          icon="plus"
          onClick={() => this.toggleEntryDialog()}
          text="Entry"
          disabled={selectedList === null}
        />
      </>
    );
  }

  render() {
    return (
    <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          {this.renderButtons()}
        </NavbarGroup>
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
