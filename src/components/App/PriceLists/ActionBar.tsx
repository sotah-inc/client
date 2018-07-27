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
import { Pricelist } from '@app/types/price-lists';
import RegionToggle from '@app/containers/util/RegionToggle';
import RealmToggle from '@app/containers/util/RealmToggle';

export type StateProps = {
  currentRegion: Region | null
  currentRealm: Realm | null
  isAddListDialogOpen: boolean
  isAddEntryDialogOpen: boolean
  selectedList: Pricelist | null
};

export type DispatchProps = {
  changeIsAddListDialogOpen: (isDialogOpen: boolean) => void
  changeIsAddEntryDialogOpen: (isDialogOpen: boolean) => void
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

  renderListButtons() {
    const { selectedList } = this.props;

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
            onClick={() => console.log('wew lad')}
            disabled={selectedList === null}
          />
          <Button
            icon="delete"
            onClick={() => console.log('wew lad')}
            text="Delete"
            disabled={selectedList === null}
          />
        </ButtonGroup>
      </>
    );
  }

  renderButtons() {
    const {
      currentRegion,
      currentRealm
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
          onClick={() => this.toggleListDialog()}
          text="List"
        />
        {this.renderListButtons()}
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
