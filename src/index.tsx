import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './containers/App';
import { sotah } from './reducers';
import { StoreState, AppLevel } from './types';
import registerServiceWorker from './registerServiceWorker';

const preloadedState: StoreState = {
  appLevel: AppLevel.initial,
  regions: {}
};
const store = createStore<StoreState>(sotah, preloadedState, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
