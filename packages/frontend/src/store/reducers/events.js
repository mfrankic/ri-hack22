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
      event_time: event.event_time,
      location_name: event.location_name,
      created_at: event.created_at,
      // desc: event.desc,
      creator_id: event.creator_id,
      // grid_id: event.grid_id,
      // image_path: event.image_path,
      // lat: event.lat,
      published: event.published,
      // lon: event.lon,
      // declined: event.declined,
      // updated_at: event.updated_at,
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
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
