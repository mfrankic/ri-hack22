export default {
  BASE: '/',

  ROUTE_MANAGEMENT: '/route-management',
  REPORTS: '/reports',
  EVENTS: '/events',
  VOLUNTEERS: '/volunteers',
  BENEFITS: '/benefits',
  LOGIN: '/login',
  REGISTER: '/register',

  api: {
    AUTHENTICATE_LOGIN: '/user/login',
    AUTHENTICATE_REGISTER: '/user/register_admin',
    AUTHENTICATE_USER: '/user/auth?auth_token=:token',
    REPORTS: '/reports',
    REPORT_ACCEPT: '/reports/accept',
    REPORT_DECLINE: '/reports/decline',
    VOLUNTEERS: '/user/list_volunteers',
    EVENTS: '/cleansing',
  },

  build: (path, ...params) => {
    params.reverse();
    return path.replace(/(:\w+)/g, () => params.pop());
  },

  // eg. params { param1: valueParam1, param2: 10, .... }
  buildQuery: (path, params) => {
    const validParamEntries = Object.entries(params).filter(
      ([, paramValue]) => paramValue !== null && paramValue !== undefined
    );

    if (!validParamEntries.length) {
      return path;
    }

    const queryParams = new URLSearchParams(
      Object.fromEntries(validParamEntries)
    );

    return `${path}?${queryParams}`;
  },
};
