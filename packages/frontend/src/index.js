/* eslint-disable camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Redirect, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';

import * as serviceWorker from './serviceWorker';
import { paths } from './constants';

import { configureStore } from './store/utils';

import {
  Benefits,
  Events,
  Login,
  Reports,
  Register,
  RouteManagement,
  Volunteers,
} from './components/pages';

import { AuthProvider, SafeRoute, Validators } from './components/common';

const history = new Proxy(createBrowserHistory(), {
  get(target, prop) {
    if (prop === 'transitionTo') {
      return (location) => {
        target.replace(location);
      };
    }
    // eslint-disable-next-line prefer-rest-params
    return Reflect.get(...arguments);
  },
});

const store = configureStore(history);

const enhancedHistory = syncHistoryWithStore(history, store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={enhancedHistory}>
        <AuthProvider>
          <Validators.UnauthorizedValidator>
            <Switch>
              <SafeRoute exact path={paths.LOGIN} component={Login} />
              <SafeRoute exact path={paths.REGISTER} component={Register} />
            </Switch>
          </Validators.UnauthorizedValidator>
          <Validators.AuthValidator>
            <Switch>
              <SafeRoute
                exact
                path={paths.BASE}
                component={() => <Redirect to={paths.REPORTS} />}
              />
              <SafeRoute
                exact
                path={paths.ROUTE_MANAGEMENT}
                component={RouteManagement}
              />
              <SafeRoute exact path={paths.REPORTS} component={Reports} />
              <SafeRoute exact path={paths.EVENTS} component={Events} />
              <SafeRoute exact path={paths.VOLUNTEERS} component={Volunteers} />
              <SafeRoute exact path={paths.BENEFITS} component={Benefits} />
            </Switch>
          </Validators.AuthValidator>
        </AuthProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
