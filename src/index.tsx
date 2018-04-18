import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './route-containers/App';
import { rootReducer } from './reducers';
import { StoreState, defaultMainState, defaultAuctionState } from './types';
import registerServiceWorker from './registerServiceWorker';

const preloadedState: StoreState = {
  Auction: defaultAuctionState,
  Main: defaultMainState
};
const store = createStore<StoreState>(rootReducer, preloadedState, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
