import * as React from 'react';
import { Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Alignment } from '@blueprintjs/core';

import RegionToggle from '../../containers/App/RegionToggle';
import RealmToggle from '../../containers/App/RealmToggle';
import { HomeButton } from './HomeButton';

export const Topbar: React.SFC = () => {
  return (
    <>
      <Navbar className="pt-dark">
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>Sotah Client</NavbarHeading>
          <NavbarDivider />
          <HomeButton />
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <RealmToggle />
          <NavbarDivider />
          <RegionToggle />
        </NavbarGroup>
      </Navbar>
    </>
  );
};
