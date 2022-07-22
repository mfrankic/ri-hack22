export default {
  BASE: '/',
  ADD_TUTORIAL: '/add-tutorial',
  TUTORIALS: '/tutorials',
  TUTORIAL: '/tutorials/:id',

  api: {
    ADD_TUTORIAL: '/add-tutorial',
    TUTORIALS: '/tutorials',
    TUTORIAL: '/tutorials/:id',
    TUTORIALS_BY_TITLE: '/tutorials/title/:title',
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
