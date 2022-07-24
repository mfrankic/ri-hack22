import { actions, paths } from 'src/constants';

export default {
  getEvents: () => ({
    [actions.API_CALL]: {
      types: [
        actions.GET_EVENTS_REQUEST,
        actions.GET_EVENTS_SUCCESS,
        actions.GET_EVENTS_FAILURE,
      ],
      promise: (client) => client.get(paths.api.EVENTS),
    },
  }),

  acceptEvent: (data) => ({
    [actions.API_CALL]: {
      types: [
        actions.PATCH_EVENT_REQUEST,
        actions.PATCH_EVENT_SUCCESS,
        actions.PATCH_EVENT_FAILURE,
      ],
      promise: (client) => client.put(paths.api.EVENT_ACCEPT, data),
    },
  }),

  declineEvent: (data) => ({
    [actions.API_CALL]: {
      types: [
        actions.PATCH_EVENT_REQUEST,
        actions.PATCH_EVENT_SUCCESS,
        actions.PATCH_EVENT_FAILURE,
      ],
      promise: (client) => client.put(paths.api.EVENT_DECLINE, data),
    },
  }),
};
