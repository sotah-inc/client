import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Intent } from '@blueprintjs/core';

import { Region, Realm } from '@app/types/global';
import {
  FetchPingLevel,
  FetchRegionLevel,
  FetchRealmLevel,
  AuthLevel
} from '@app/types/main';
import Topbar from '@app/route-containers/App/Topbar';
import { Content } from '@app/components/App/Content';
import { didRegionChange } from '@app/util';
import { AppToaster } from '@app/util/toasters';

import './App.scss';

export type StateProps = {
  fetchPingLevel: FetchPingLevel
  fetchRegionLevel: FetchRegionLevel
  currentRegion: Region | null
  fetchRealmLevel: FetchRealmLevel
  currentRealm: Realm | null
  preloadedToken: string
  authLevel: AuthLevel
  isLoginDialogOpen: boolean
};

export type DispatchProps = {
  onLoad: () => void
  reloadUser: (token: string) => void
  refreshRegions: () => void
  refreshRealms: (region: Region) => void
  changeIsLoginDialogOpen: (isLoginDialogOpen: boolean) => void
};

export interface OwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class App extends React.Component<Props> {
  didHandleUnauth: boolean = false;

  componentDidMount() {
    const { onLoad, preloadedToken, reloadUser } = this.props;

    onLoad();

    if (preloadedToken.length > 0) {
      reloadUser(preloadedToken);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const {
      fetchPingLevel,
      fetchRegionLevel,
      currentRegion,
      refreshRegions,
      fetchRealmLevel,
      refreshRealms,
      authLevel,
      isLoginDialogOpen,
      changeIsLoginDialogOpen
    } = this.props;

    if (prevProps.authLevel !== authLevel) {
      switch (authLevel) {
        case AuthLevel.unauthenticated:
          if (this.didHandleUnauth === false) {
            this.didHandleUnauth = true;
      
            AppToaster.show({
              message: 'Your session has expired.',
              intent: Intent.WARNING,
              icon: 'info-sign',
              action: {
                text: 'Login',
                intent: Intent.PRIMARY,
                icon: 'log-in',
                onClick: () => changeIsLoginDialogOpen(!isLoginDialogOpen)
              }
            });
          }
  
          break;
        case AuthLevel.authenticated:
          this.didHandleUnauth = false;

          if ([AuthLevel.unauthenticated, AuthLevel.initial].indexOf(prevProps.authLevel) === -1) {
            break;
          }

          AppToaster.show({
            message: 'You are logged in.',
            intent: Intent.SUCCESS,
            icon: 'user'
          });
  
          break;
        default:
          break;
      }
    }

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
