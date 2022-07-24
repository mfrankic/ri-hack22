import { createSelector } from 'reselect';

const getHasLoaded = createSelector(
  (state) => state.events.hasLoaded,
  (hasLoaded) => hasLoaded
);

const getIsSubmitting = createSelector(
  (state) => state.events.isSubmitting,
  (isSubmitting) => isSubmitting
);

const getEvents = createSelector(
  (state) => state.events.data,
  (events) => events
);

export default {
  getHasLoaded,
  getIsSubmitting,
  getEvents,
};
