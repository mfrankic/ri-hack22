import { actions, paths } from 'src/constants';

export default {
  getVolunteers: () => ({
    [actions.API_CALL]: {
      types: [
        actions.GET_VOLUNTEERS_REQUEST,
        actions.GET_VOLUNTEERS_SUCCESS,
        actions.GET_VOLUNTEERS_FAILURE,
      ],
      promise: (client) => client.get(paths.api.VOLUNTEERS),
    },
  }),
};
