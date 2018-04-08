import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import RealmList from '../../containers/App/RealmList';
import { NotFound } from '../util/NotFound';

export const Content: React.SFC = () => {
    return (
      <Switch>
        <Route exact={true} path="/" component={RealmList} />
        <Route component={NotFound} />
      </Switch>
    );
  };
