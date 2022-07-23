import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { actions } from 'src/constants';

import authentication from './authentication';
import reports from './reports';

const staticReducers = {
  authentication,
  reports,
};

const rootReducer = (asyncReducers) => {
  const appReducer = combineReducers({
    ...staticReducers,
    ...asyncReducers,

    routing: routerReducer,
  });

  return (state, action) => {
    if (action?.type === actions.CLEAR_USER_STORE_DATA) {
      // eslint-disable-next-line no-param-reassign
      state = undefined;
    }

    return appReducer(state, action);
  };
};

export default rootReducer;
