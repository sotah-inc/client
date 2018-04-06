import * as React from 'react';
import { Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Alignment, Spinner } from '@blueprintjs/core';
import { Route, RouteComponentProps } from 'react-router-dom';

import { FetchPingLevel, FetchRegionLevel, Regions, Region, FetchRealmLevel } from '../types';
import RealmList from '../containers/App/RealmList';
import RegionToggle from '../containers/App/RegionToggle';
import RealmToggle from '../containers/App/RealmToggle';
import { NotFound } from './App/NotFound';
import { HomeButton } from './App/HomeButton';

import './App.scss';

export type StateProps = {
  fetchPingLevel: FetchPingLevel
  fetchRegionLevel: FetchRegionLevel
  fetchRealmLevel: FetchRealmLevel
  regions: Regions
  currentRegion: Region | null
};

export type DispatchProps = {
  onLoad: () => void
  refreshRegions: () => void
  refreshRealms: (region: Region) => void
};

export interface OwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class App extends React.Component<Props> {
  componentDidMount() {
    this.props.onLoad();
  }

  didRegionChange(prevRegion: Region | null, currentRegion: Region | null): boolean {
    if (prevRegion === null) {
      return true;
    }

    if (currentRegion === null) {
      return false;
    }

    if (prevRegion.name === currentRegion.name) {
      return false;
    }

    return true;
  }

  componentDidUpdate(prevProps: Props) {
    const { fetchPingLevel, fetchRegionLevel, fetchRealmLevel, currentRegion } = this.props;

    if (fetchPingLevel === FetchPingLevel.success && fetchRegionLevel === FetchRegionLevel.initial) {
      this.props.refreshRegions();

      return;
    }

    if (currentRegion !== null) {
      const shouldRefreshRealms = fetchRealmLevel === FetchRealmLevel.initial
        || fetchRealmLevel === FetchRealmLevel.success
          && this.didRegionChange(prevProps.currentRegion, currentRegion);
      if (shouldRefreshRealms) {
        this.props.refreshRealms(currentRegion);

        return;
      }
    }
  }

  renderRegionToggle() {
    const { fetchRegionLevel } = this.props;
    switch (fetchRegionLevel) {
      case FetchRegionLevel.initial:
      case FetchRegionLevel.fetching:
        return (
          <NavbarGroup align={Alignment.RIGHT}>
            <Spinner className="pt-small"/>
          </NavbarGroup>
        );
      case FetchRegionLevel.failure:
        return (
          <NavbarGroup align={Alignment.RIGHT}>
            Could not fetch regions!
          </NavbarGroup>
        );
      case FetchRegionLevel.success:
        return (
          <NavbarGroup align={Alignment.RIGHT}>
            <RealmToggle/>
            <NavbarDivider/>
            <RegionToggle/>
          </NavbarGroup>
        );
      default:
        return (
          <NavbarGroup align={Alignment.RIGHT}>
            You should never see this!
          </NavbarGroup>
        );
    }
  }

  renderConnected() {
    return (
      <>
        <Navbar className="pt-dark">
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>Sotah Client</NavbarHeading>
            <NavbarDivider/>
            <HomeButton/>
          </NavbarGroup>
          {this.renderRegionToggle()}
        </Navbar>
        <Route exact={true} path="/" component={RealmList}/>
        <Route component={NotFound}/>
      </>
    );
  }

  render() {
    const { fetchPingLevel } = this.props;
    switch (fetchPingLevel) {
      case FetchPingLevel.initial:
        return <>Welcome!</>;
      case FetchPingLevel.fetching:
        return <>Connecting...</>;
      case FetchPingLevel.failure:
        return <>Could not connect!</>;
      case FetchPingLevel.success:
        return this.renderConnected();
      default:
        return <>You should never see this!</>;
    }
  }
}
