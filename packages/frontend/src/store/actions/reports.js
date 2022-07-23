import { actions, paths } from 'src/constants';

export default {
  getReports: () => ({
    [actions.API_CALL]: {
      types: [
        actions.GET_REPORTS_REQUEST,
        actions.GET_REPORTS_SUCCESS,
        actions.GET_REPORTS_FAILURE,
      ],
      promise: (client) => client.get(paths.api.REPORTS),
    },
  }),

  acceptReport: (data) => ({
    [actions.API_CALL]: {
      types: [
        actions.PATCH_REPORT_REQUEST,
        actions.PATCH_REPORT_SUCCESS,
        actions.PATCH_REPORT_FAILURE,
      ],
      promise: (client) => client.patch(paths.api.REPORT_ACCEPT, data),
    },
  }),

  declineReport: (data) => ({
    [actions.API_CALL]: {
      types: [
        actions.PATCH_REPORT_REQUEST,
        actions.PATCH_REPORT_SUCCESS,
        actions.PATCH_REPORT_FAILURE,
      ],
      promise: (client) => client.patch(paths.api.REPORT_DECLINE, data),
    },
  }),
};
