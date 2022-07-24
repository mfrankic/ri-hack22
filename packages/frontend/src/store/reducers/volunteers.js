import { actions } from 'src/constants';

const initialState = {
  data: {
    volunteers: [],
    requests: [],
  },
  hasLoaded: false,
  isSubmitting: false,
};

const actionMap = {
  [actions.GET_VOLUNTEERS_REQUEST]: (state) => ({
    ...state,
    hasLoaded: false,
  }),
  [actions.GET_VOLUNTEERS_SUCCESS]: (state, { result }) => ({
    ...state,
    data: {
      ...state.data,
      volunteers: result.data.volunteers?.map((volunteer) => ({
        id: volunteer.id,
        name: volunteer.name,
        email: volunteer.email,
        points: volunteer.points,
        role: volunteer.role,
        created_at: volunteer.created_at,
        updated_at: volunteer.updated_at,
      })),
    },
    hasLoaded: true,
  }),
  [actions.GET_VOLUNTEERS_FAILURE]: (state, { error }) => ({
    ...state,
    data: error.response.status,
    hasLoaded: true,
  }),

  [actions.GET_VOLUNTEER_REQUESTS_REQUEST]: (state) => ({
    ...state,
    hasLoaded: false,
  }),
  [actions.GET_VOLUNTEER_REQUESTS_SUCCESS]: (state, { result }) => ({
    ...state,
    data: {
      ...state.data,
      requests: result.data.volunteerRequests?.map((request) => ({
        id: request.id,
        name: request.name,
        email: request.email,
      })),
    },
    hasLoaded: true,
  }),
  [actions.GET_VOLUNTEER_REQUESTS_FAILURE]: (state, { error }) => ({
    ...state,
    data: error.response.status,
    hasLoaded: true,
  }),

  [actions.PATCH_REQUEST_REQUEST]: (state) => ({
    ...state,
    isSubmitting: true,
  }),
  [actions.PATCH_REQUEST_SUCCESS]: (state, { result }) => {
    return {
      ...state,
      data: {
        ...state.data,
        requests: state.data.requests.filter(
          (request) => request.id !== result.data.volunteerRequest[0].id
        ),
      },
      hasLoaded: true,
      isSubmitting: false,
    };
  },
  [actions.PATCH_REQUEST_FAILURE]: (state) => ({
    ...state,
    hasLoaded: true,
    isSubmitting: false,
  }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
