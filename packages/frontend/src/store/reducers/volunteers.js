import { actions, statusCodes } from 'src/constants';

const initialState = {
  data: [],
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
    data: result.data.volunteers.map((volunteer) => ({
      id: volunteer.id,
      name: volunteer.name,
      email: volunteer.email,
      points: volunteer.points,
      role: volunteer.role,
      created_at: volunteer.created_at,
      updated_at: volunteer.updated_at,
    })),
    hasLoaded: true,
  }),
  [actions.GET_VOLUNTEERS_FAILURE]: (state, { error }) => ({
    ...state,
    data:
      error.response.status === statusCodes.PAYMENT_REQUIRED
        ? { user: error.response.data.user }
        : {},
    hasLoaded: true,
  }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
