import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { FetchPingLevel, FetchRegionLevel, Region, FetchRealmLevel, Realm } from '../types/main';
import { FetchAuctionsLevel } from '../types/auction';
import Topbar from '../route-containers/App/Topbar';
import { Content } from './App/Content';

import './App.scss';

export type StateProps = {
  fetchPingLevel: FetchPingLevel
  fetchRegionLevel: FetchRegionLevel
  fetchRealmLevel: FetchRealmLevel
  fetchAuctionsLevel: FetchAuctionsLevel
  currentRegion: Region | null
  currentRealm: Realm | null
};

export type DispatchProps = {
  onLoad: () => void
  refreshRegions: () => void
  refreshRealms: (region: Region) => void
  refreshAuctions: (region: Region, realm: Realm) => void
};

export interface OwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class App extends React.Component<Props> {
  componentDidMount() {
    this.props.onLoad();
  }

  didRegionChange(prevRegion: Region | null, currentRegion: Region): boolean {
    if (prevRegion === null) {
      return true;
    }

    if (prevRegion.name === currentRegion.name) {
      return false;
    }

    return true;
  }

  didRealmChange(prevRealm: Realm | null, currentRealm: Realm): boolean {
    if (prevRealm === null) {
      return true;
    }

    if (prevRealm.slug === currentRealm.slug) {
      return false;
    }

    return true;
  }

  componentDidUpdate(prevProps: Props) {
    const {
      fetchPingLevel,
      fetchRegionLevel,
      fetchRealmLevel,
      fetchAuctionsLevel,
      currentRegion,
      currentRealm
    } = this.props;

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

    if (currentRegion !== null && currentRealm !== null) {
      const shouldRefreshAuctions = fetchAuctionsLevel === FetchAuctionsLevel.initial
        || fetchAuctionsLevel === FetchAuctionsLevel.success
          && this.didRealmChange(prevProps.currentRealm, currentRealm);
      if (shouldRefreshAuctions) {
        this.props.refreshAuctions(currentRegion, currentRealm);
      }
    }
  }

  renderConnected() {
    return (
      <div id="app">
        <Topbar/>
        <Content/>
      </div>
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
