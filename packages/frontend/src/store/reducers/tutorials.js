import { actions } from 'src/constants';

const initialState = {
  data: [],
  submitted: false,
  hasLoaded: false,
  isLoading: false,
  isSubmitting: false,
};

const actionMap = {
  [actions.GET_TUTORIALS_REQUEST]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [actions.GET_TUTORIALS_SUCCESS]: (state, { payload }) => ({
    ...state,
    data: payload.data,
    isLoading: false,
    hasLoaded: true,
  }),
  [actions.GET_TUTORIALS_FAILURE]: (state) => ({
    ...state,
    isLoading: false,
  }),

  [actions.ADD_TUTORIAL_REQUEST]: (state) => ({
    ...state,
    isSubmitting: true,
  }),
  [actions.ADD_TUTORIAL_SUCCESS]: (state, { payload }) => ({
    ...state,
    data: [...state.data, { ...payload.data }],
    isSubmitting: false,
    submitted: true,
  }),
  [actions.ADD_TUTORIAL_FAILURE]: (state) => ({
    ...state,
    isSubmitting: false,
  }),

  [actions.UPDATE_TUTORIAL_REQUEST]: (state) => ({
    ...state,
    isSubmitting: true,
  }),
  [actions.UPDATE_TUTORIAL_SUCCESS]: (state, { payload }) => ({
    ...state,
    data: state.data.map((tutorial) =>
      tutorial.id === payload.data.id ? payload.data : tutorial
    ),
    isSubmitting: false,
    submitted: true,
  }),
  [actions.UPDATE_TUTORIAL_FAILURE]: (state) => ({
    ...state,
    isSubmitting: false,
  }),

  [actions.DELETE_TUTORIAL_REQUEST]: (state) => ({
    ...state,
    isSubmitting: true,
  }),
  [actions.DELETE_TUTORIAL_SUCCESS]: (state, { payload }) => ({
    ...state,
    data: state.data.filter((tutorial) => tutorial.id !== payload.data.id),
    isSubmitting: false,
    submitted: true,
  }),
  [actions.DELETE_TUTORIAL_FAILURE]: (state) => ({
    ...state,
    isSubmitting: false,
  }),

  [actions.DELETE_ALL_TUTORIALS_REQUEST]: (state) => ({
    ...state,
    isSubmitting: true,
  }),
  [actions.DELETE_ALL_TUTORIALS_SUCCESS]: (state) => ({
    ...state,
    data: [],
    isSubmitting: false,
    submitted: true,
  }),
  [actions.DELETE_ALL_TUTORIALS_FAILURE]: (state) => ({
    ...state,
    isSubmitting: false,
  }),

  [actions.CLEAR_TUTORIAL_SUBMITTED_STATE]: (state) => ({
    ...state,
    submitted: false,
  }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
