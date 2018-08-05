import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuctionList from '@app/containers/App/AuctionList';
import PriceLists from '@app/containers/App/PriceLists';
import { NotFound } from '../util/NotFound';

export const Content: React.SFC = () => {
  return (
    <div id="content">
      <Switch>
        <Route exact={true} path="/auctions" component={AuctionList} />
        <Route exact={true} path="/price-lists" component={PriceLists} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};
