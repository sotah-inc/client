import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { FetchPingLevel } from '../types/main';
import Topbar from '../route-containers/App/Topbar';
import { Content } from './App/Content';

import './App.scss';

export type StateProps = {
  fetchPingLevel: FetchPingLevel
};

export type DispatchProps = {
  onLoad: () => void
};

export interface OwnProps extends RouteComponentProps<{}> {}

export type Props = Readonly<StateProps & DispatchProps & OwnProps>;

export class App extends React.Component<Props> {
  componentDidMount() {
    this.props.onLoad();
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
