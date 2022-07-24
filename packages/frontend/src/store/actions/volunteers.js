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

  getVolunteerRequests: () => ({
    [actions.API_CALL]: {
      types: [
        actions.GET_VOLUNTEER_REQUESTS_REQUEST,
        actions.GET_VOLUNTEER_REQUESTS_SUCCESS,
        actions.GET_VOLUNTEER_REQUESTS_FAILURE,
      ],
      promise: (client) => client.get(paths.api.VOLUNTEER_REQUESTS),
    },
  }),

  acceptVolunteer: (data) => ({
    [actions.API_CALL]: {
      types: [
        actions.PATCH_REQUEST_REQUEST,
        actions.PATCH_REQUEST_SUCCESS,
        actions.PATCH_REQUEST_FAILURE,
      ],
      promise: (client) => client.put(paths.api.VOLUNTEER_REQUEST_ACCEPT, data),
    },
  }),

  declineVolunteer: (data) => ({
    [actions.API_CALL]: {
      types: [
        actions.PATCH_REQUEST_REQUEST,
        actions.PATCH_REQUEST_SUCCESS,
        actions.PATCH_REQUEST_FAILURE,
      ],
      promise: (client) =>
        client.put(paths.api.VOLUNTEER_REQUEST_DECLINE, data),
    },
  }),
};
