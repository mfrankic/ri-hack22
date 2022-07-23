// import _cloneDeep from 'lodash/cloneDeep';

import { jwt } from 'src/utils';
import { actions, statusCodes } from 'src/constants';

const initialState = {
  data: {},
  hasLoaded: false,
  hasSubmitted: false,
  isAuthenticated: false,
  isLoading: false,
  isSubmitting: false,
  hasSubmittedForgotPassword: false,
};

const actionMap = {
  [actions.AUTHENTICATE_USER_REQUEST]: (state) => ({
    ...state,
    hasLoaded: false,
    isAuthenticated: false,
    isLoading: true,
  }),
  [actions.AUTHENTICATE_USER_SUCCESS]: (state, { result }) => {
    return {
      ...state,
      data: result.data,
      hasLoaded: true,
      isAuthenticated: true,
      isLoading: false,
    };
  },
  [actions.AUTHENTICATE_USER_FAILURE]: (state, { error }) => {
    return {
      ...state,
      data:
        error.response.status === statusCodes.PAYMENT_REQUIRED
          ? { user: error.response.data.user }
          : {},
      hasLoaded: true,
      isAuthenticated: error.response.status === statusCodes.PAYMENT_REQUIRED,
      isLoading: false,
    };
  },

  [actions.REGISTER_REQUEST]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [actions.REGISTER_SUCCESS]: (state, { result }) => {
    jwt.setToken(result.data.auth_token);

    return {
      ...state,
      hasLoaded: true,
      hasSubmitted: true,
      isAuthenticated: true,
      isLoading: false,
    };
  },
  [actions.REGISTER_FAILURE]: (state) => ({
    ...state,
    hasLoaded: true,
    hasSubmitted: true,
    isAuthenticated: false,
    isLoading: false,
  }),

  [actions.LOGIN_REQUEST]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [actions.LOGIN_SUCCESS]: (state, { result }) => {
    jwt.setToken(result.data.auth_token);

    return {
      ...state,
      data: result.data,
      hasLoaded: true,
      hasSubmitted: true,
      isAuthenticated: true,
      isLoading: false,
    };
  },
  [actions.LOGIN_FAILURE]: (state) => ({
    ...state,
    hasLoaded: true,
    hasSubmitted: true,
    isAuthenticated: false,
    isLoading: false,
  }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
