import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, createStore, Middleware } from "redux";
import thunk from "redux-thunk";

import { USER_LOGIN, USER_REGISTER } from "@app/actions/main";
import { rootReducer } from "@app/reducers";
import registerServiceWorker from "@app/registerServiceWorker";
import { AppRouteContainer } from "@app/route-containers/App";
import { defaultAuctionState, defaultMainState, defaultPriceListsState, IStoreState } from "@app/types";

const ayy: IStoreState = {
    Auction: defaultAuctionState,
    Main: defaultMainState,
    PriceLists: defaultPriceListsState,
};

const token = localStorage.getItem("token");
if (token !== null) {
    ayy.Main.preloadedToken = token;
}

const localStorageMiddleware: Middleware = () => next => action => {
    switch (action.type) {
        case USER_LOGIN:
        case USER_REGISTER:
            localStorage.setItem("token", action.payload.token);

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
            <AppRouteContainer />
        </Router>
    </Provider>,
    document.getElementById("root") as HTMLElement,
);
registerServiceWorker();
