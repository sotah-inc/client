import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, Middleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '@app/route-containers/App';
import { rootReducer } from '@app/reducers';
import { StoreState, defaultMainState, defaultAuctionState, defaultPriceListsState } from '@app/types';
import registerServiceWorker from '@app/registerServiceWorker';

const ayy: StoreState = {
  Auction: defaultAuctionState,
  Main: defaultMainState,
  PriceLists: defaultPriceListsState
};

const localStorageMiddleware: Middleware = () => next => action => next(action);

const store = createStore<StoreState>(rootReducer, ayy, applyMiddleware(localStorageMiddleware, thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
