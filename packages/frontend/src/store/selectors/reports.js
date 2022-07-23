import { createSelector } from 'reselect';

const getHasLoaded = createSelector(
  (state) => state.reports.hasLoaded,
  (hasLoaded) => hasLoaded
);

const getIsSubmitting = createSelector(
  (state) => state.reports.isSubmitting,
  (isSubmitting) => isSubmitting
);

const getReports = createSelector(
  (state) => state.reports.data,
  (reports) => reports
);

export default {
  getHasLoaded,
  getIsSubmitting,
  getReports,
};
