import { createSelector } from 'reselect';

const getHasLoaded = createSelector(
  (state) => state.volunteers.hasLoaded,
  (hasLoaded) => hasLoaded
);

const getIsSubmitting = createSelector(
  (state) => state.volunteers.isSubmitting,
  (isSubmitting) => isSubmitting
);

const getVolunteers = createSelector(
  (state) => state.volunteers.data,
  (volunteers) => volunteers
);

export default {
  getHasLoaded,
  getIsSubmitting,
  getVolunteers,
};
