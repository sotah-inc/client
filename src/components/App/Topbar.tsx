import * as React from 'react';
import { Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Alignment, ButtonGroup } from '@blueprintjs/core';
import { RouteComponentProps } from 'react-router-dom';

import RegionToggle from '../../containers/App/RegionToggle';
import RealmToggle from '../../containers/App/RealmToggle';
import LinkButton from '../../route-containers/util/LinkButton';

export interface Props extends RouteComponentProps<Props> { }

export const Topbar: React.SFC<Props> = (props: Props) => {
  return (
    <>
      <Navbar className="pt-dark">
        <div id="topbar" >
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>Sotah Client</NavbarHeading>
            <NavbarDivider />
            <ButtonGroup>
              <LinkButton icon="home" text="Home" destination="/" />
              <LinkButton icon="list" text="Realms" destination="/realms" />
              <LinkButton icon="user" text="Register" destination="/register" />
            </ButtonGroup>
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            <RealmToggle />
            <NavbarDivider />
            <RegionToggle />
          </NavbarGroup>
        </div>
      </Navbar>
    </>
  );
};
