import { actions, statusCodes } from 'src/constants';

const initialState = {
  data: [],
  hasLoaded: false,
  isSubmitting: false,
};

const actionMap = {
  [actions.GET_EVENTS_REQUEST]: (state) => ({
    ...state,
    hasLoaded: false,
  }),
  [actions.GET_EVENTS_SUCCESS]: (state, { result }) => ({
    ...state,
    data: result.data.cleansing.map((event) => ({
      id: event.id,
      title: event.title,
      image_path: event.image_path,
      desc: event.desc,
      event_time: event.event_time,
      location_name: event.location_name,
      created_at: event.created_at,
      creator_id: event.creator_id,
      published: event.published,
    })),
    hasLoaded: true,
  }),
  [actions.GET_EVENTS_FAILURE]: (state, { error }) => ({
    ...state,
    data:
      error.response.status === statusCodes.PAYMENT_REQUIRED
        ? { user: error.response.data.user }
        : {},
    hasLoaded: true,
  }),

  [actions.PATCH_EVENT_REQUEST]: (state) => ({
    ...state,
    isSubmitting: true,
  }),
  [actions.PATCH_EVENT_SUCCESS]: (state, { result }) => {
    return {
      ...state,
      data: state.data.filter((event) => event.id !== result.data.event.id),
      hasLoaded: true,
      isSubmitting: false,
    };
  },
  [actions.PATCH_EVENT_FAILURE]: (state) => ({
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
