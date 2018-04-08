import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import RealmList from '../../containers/App/RealmList';
import { NotFound } from '../util/NotFound';

export const Content: React.SFC = () => {
  return (
    <div id="content">
      <Switch>
        <Route exact={true} path="/realms" component={RealmList} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};
