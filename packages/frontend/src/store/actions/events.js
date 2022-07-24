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
};
