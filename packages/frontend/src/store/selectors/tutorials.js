import { createSelector } from 'reselect';

const getTutorials = createSelector(
  (state) => state.tutorials.data,
  (tutorials) => tutorials
);

export default {
  getTutorials,
};
