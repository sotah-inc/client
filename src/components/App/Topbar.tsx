import * as React from 'react';
import { Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Alignment, Spinner } from '@blueprintjs/core';

import { FetchRegionLevel } from '../../types';
import RegionToggle from '../../containers/App/RegionToggle';
import RealmToggle from '../../containers/App/RealmToggle';
import { HomeButton } from './HomeButton';

export type StateProps = {
  fetchRegionLevel: FetchRegionLevel
};

export type DispatchProps = {};

export type OwnProps = {};

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class Topbar extends React.Component<Props> {
  renderRegionRealmToggle() {
    const { fetchRegionLevel } = this.props;
    switch (fetchRegionLevel) {
      case FetchRegionLevel.initial:
      case FetchRegionLevel.fetching:
        return (
          <Spinner className="pt-small" />
        );
      case FetchRegionLevel.failure:
        return 'Could not fetch regions!';
      case FetchRegionLevel.success:
        return (
          <>
            <RealmToggle />
            <NavbarDivider />
            <RegionToggle />
          </>
        );
      default:
        return 'You should never see this!';
    }
  }

  render() {
    return (
      <>
        <Navbar className="pt-dark">
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>Sotah Client</NavbarHeading>
            <NavbarDivider />
            <HomeButton />
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            {this.renderRegionRealmToggle()}
          </NavbarGroup>
        </Navbar>
      </>
    );
  }
}
