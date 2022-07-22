/* eslint-disable camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';

import * as serviceWorker from './serviceWorker';
import { paths } from './constants';

import { configureStore } from './store/utils';

import { AddTutorial } from './components/pages';

import 'bootstrap/dist/css/bootstrap.min.css';

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
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={paths.TUTORIALS} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={paths.TUTORIALS} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={paths.ADD_TUTORIAL} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            {/* <Route
              exact
              path={[paths.BASE, paths.TUTORIALS]}
              component={TutorialsList}
            /> */}
            <Route exact path={paths.ADD_TUTORIAL} component={AddTutorial} />
            {/* <Route path={paths.TUTORIAL} component={Tutorial} /> */}
          </Switch>
        </div>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
