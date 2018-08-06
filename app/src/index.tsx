import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, Middleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '@app/route-containers/App';
import { USER_LOGIN, USER_REGISTER } from '@app/actions/main';
import { rootReducer } from '@app/reducers';
import { IStoreState, defaultMainState, defaultAuctionState, defaultPriceListsState } from '@app/types';
import registerServiceWorker from '@app/registerServiceWorker';

const ayy: IStoreState = {
  Auction: defaultAuctionState,
  Main: defaultMainState,
  PriceLists: defaultPriceListsState
};

const token = localStorage.getItem('token');
if (token !== null) {
  ayy.Main.preloadedToken = token;
}

const localStorageMiddleware: Middleware = () => next => action => {
  switch (action.type) {
    case USER_LOGIN:
    case USER_REGISTER:
      localStorage.setItem('token', action.payload.token);

      break;
    default:
      break;
  }

  return next(action);
};

const store = createStore<IStoreState>(rootReducer, ayy, applyMiddleware(localStorageMiddleware, thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
