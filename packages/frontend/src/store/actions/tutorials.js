import { actions, paths } from 'src/constants';

export default {
  addTutorial: ({ title, description }) => ({
    [actions.API_CALL]: {
      types: [
        actions.ADD_TUTORIAL_REQUEST,
        actions.ADD_TUTORIAL_SUCCESS,
        actions.ADD_TUTORIAL_FAILURE,
      ],
      promise: (client) =>
        client.post(paths.api.ADD_TUTORIAL, { title, description }),
    },
  }),

  getTutorials: () => ({
    [actions.API_CALL]: {
      types: [
        actions.GET_TUTORIALS_REQUEST,
        actions.GET_TUTORIALS_SUCCESS,
        actions.GET_TUTORIALS_FAILURE,
      ],
      promise: (client) => client.get(paths.api.TUTORIALS),
    },
  }),

  updateTutorial: ({ id, title, description }) => ({
    [actions.API_CALL]: {
      types: [
        actions.UPDATE_TUTORIAL_REQUEST,
        actions.UPDATE_TUTORIAL_SUCCESS,
        actions.UPDATE_TUTORIAL_FAILURE,
      ],
      promise: (client) =>
        client.patch(paths.build(paths.api.TUTORIAL, id), {
          title,
          description,
        }),
    },
  }),

  deleteTutorial: (id) => ({
    [actions.API_CALL]: {
      types: [
        actions.DELETE_TUTORIAL_REQUEST,
        actions.DELETE_TUTORIAL_SUCCESS,
        actions.DELETE_TUTORIAL_FAILURE,
      ],
      promise: (client) => client.delete(paths.build(paths.api.TUTORIAL, id)),
    },
  }),

  deleteAllTutorials: () => ({
    [actions.API_CALL]: {
      types: [
        actions.DELETE_ALL_TUTORIALS_REQUEST,
        actions.DELETE_ALL_TUTORIALS_SUCCESS,
        actions.DELETE_ALL_TUTORIALS_FAILURE,
      ],
      promise: (client) => client.delete(paths.api.TUTORIALS),
    },
  }),

  clearTutorialSubmittedState: () => ({
    type: actions.CLEAR_TUTORIAL_SUBMITTED_STATE,
  }),
};
