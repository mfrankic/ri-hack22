import { actions } from 'src/constants';

const initialState = {
  data: [],
  hasLoaded: false,
  isSubmitting: false,
};

const actionMap = {
  [actions.GET_REPORTS_REQUEST]: (state) => ({
    ...state,
    hasLoaded: false,
  }),
  [actions.GET_REPORTS_SUCCESS]: (state, { result }) => ({
    ...state,
    data: result.data.reports.map((report) => ({
      id: report.id,
      type: report.type,
      grid_id: report.grid_id,
      image_path: report.image_path.replace('\\', ''),
      created_at: report.created_at,
    })),
    hasLoaded: true,
  }),
  [actions.GET_REPORTS_FAILURE]: (state, { error }) => ({
    ...state,
    data: error.response.status,
    hasLoaded: true,
  }),

  [actions.PATCH_REPORT_REQUEST]: (state) => ({
    ...state,
    isSubmitting: true,
  }),
  [actions.PATCH_REPORT_SUCCESS]: (state, { result }) => {
    return {
      ...state,
      data: state.data.filter((report) => report.id !== result.data.report.id),
      hasLoaded: true,
      isSubmitting: false,
    };
  },
  [actions.PATCH_REPORT_FAILURE]: (state) => ({
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
