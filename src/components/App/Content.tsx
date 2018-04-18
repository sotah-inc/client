import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuctionList from '@app/containers/App/AuctionList';
import { NotFound } from '../util/NotFound';

export const Content: React.SFC = () => {
  return (
    <div id="content">
      <Switch>
        <Route exact={true} path="/auctions" component={AuctionList} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};
