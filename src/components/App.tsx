import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Region, Realm } from '@app/types/global';
import {
  FetchPingLevel,
  FetchRegionLevel,
  FetchRealmLevel
} from '@app/types/main';
import Topbar from '@app/route-containers/App/Topbar';
import { Content } from '@app/components/App/Content';
import { didRegionChange } from '@app/util';

import './App.scss';

export type StateProps = {
  fetchPingLevel: FetchPingLevel
  fetchRegionLevel: FetchRegionLevel
  currentRegion: Region | null
  fetchRealmLevel: FetchRealmLevel
  currentRealm: Realm | null
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

  componentDidUpdate(prevProps: Props) {
    const {
      fetchPingLevel,
      fetchRegionLevel,
      currentRegion,
      refreshRegions,
      fetchRealmLevel,
      refreshRealms
    } = this.props;

    if (fetchPingLevel === FetchPingLevel.success && fetchRegionLevel === FetchRegionLevel.initial) {
      refreshRegions();

      return;
    }

    if (currentRegion !== null) {
      const shouldRefreshRealms = fetchRealmLevel === FetchRealmLevel.initial
        || fetchRealmLevel === FetchRealmLevel.success
        && didRegionChange(prevProps.currentRegion, currentRegion);
      if (shouldRefreshRealms) {
        refreshRealms(currentRegion);
      }
    }
  }

  renderConnected() {
    return (
      <div id="app">
        <Topbar />
        <Content />
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
