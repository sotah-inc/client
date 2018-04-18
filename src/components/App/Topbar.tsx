import * as React from 'react';
import { Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Alignment, ButtonGroup } from '@blueprintjs/core';
import { RouteComponentProps } from 'react-router-dom';

import RegionToggle from '../../containers/App/RegionToggle';
import RealmToggle from '../../containers/App/RealmToggle';
import Register from '../../containers/App/Register';
import Login from '../../containers/App/Login';
import LinkButton from '../../route-containers/util/LinkButton';
import { User } from '../../types/main';

export type StateProps = {
  user: User | null
};

export type DispatchProps = {};

export interface OwnProps extends RouteComponentProps<Props> { }

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class Topbar extends React.Component<Props> {
  renderUserInfo() {
    const { user } = this.props;
    if (user === null) {
      return (
        <ButtonGroup>
          <Register />
          <Login />
        </ButtonGroup>
      );
    }

    return (
      <LinkButton
        icon="user"
        text="Profile"
        destination="/profile"
      />
    );
  }

  render() {
    return (
      <>
        <Navbar className="pt-dark">
          <div id="topbar" >
            <NavbarGroup align={Alignment.LEFT}>
              <NavbarHeading>Sotah Client</NavbarHeading>
              <NavbarDivider />
              <ButtonGroup>
                <LinkButton icon="home" text="Home" destination="/" />
                <LinkButton icon="list" text="Auctions" destination="/auctions" />
              </ButtonGroup>
              <NavbarDivider />
              {this.renderUserInfo()}
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
              <ButtonGroup>
                <RealmToggle />
                <RegionToggle />
              </ButtonGroup>
            </NavbarGroup>
          </div>
        </Navbar>
      </>
    );
  }
}
