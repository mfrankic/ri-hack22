import { actions, paths } from 'src/constants';

export default {
  authenticateUser: (token) => ({
    [actions.API_CALL]: {
      types: [
        actions.AUTHENTICATE_USER_REQUEST,
        actions.AUTHENTICATE_USER_SUCCESS,
        actions.AUTHENTICATE_USER_FAILURE,
      ],
      promise: (client) =>
        client.get(paths.build(paths.api.AUTHENTICATE_USER, token)),
    },
  }),

  resolveUsers: () => ({
    [actions.API_CALL]: {
      types: [
        actions.RESOLVE_USERS_REQUEST,
        actions.RESOLVE_USERS_SUCCESS,
        actions.RESOLVE_USERS_FAILURE,
      ],
      promise: (client) => client.get(paths.api.AUTHENTICATE_RESOLVE_USERS),
    },
  }),

  register: (data, token) => ({
    [actions.API_CALL]: {
      types: [
        actions.REGISTER_REQUEST,
        actions.REGISTER_SUCCESS,
        actions.REGISTER_FAILURE,
      ],
      promise: (client) =>
        client.post(paths.api.AUTHENTICATE_REGISTER, data, {
          params: { token },
        }),
    },
  }),

  login: (data) => ({
    [actions.API_CALL]: {
      types: [
        actions.LOGIN_REQUEST,
        actions.LOGIN_SUCCESS,
        actions.LOGIN_FAILURE,
      ],
      promise: (client) => client.post(paths.api.AUTHENTICATE_LOGIN, data),
    },
  }),

  updateUser: (data) => ({
    [actions.API_CALL]: {
      types: [
        actions.USER_UPDATE_REQUEST,
        actions.USER_UPDATE_SUCCESS,
        actions.USER_UPDATE_FAILURE,
      ],
      promise: (client) => client.patch(paths.api.USERS_ME, data),
    },
  }),

  resetState: () => ({
    type: actions.STATE_RESET,
  }),

  clearUser: () => ({
    type: actions.CLEAR_USER_STORE_DATA,
  }),
};
