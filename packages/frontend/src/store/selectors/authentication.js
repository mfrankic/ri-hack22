import { createSelector } from 'reselect';

const getIsLoading = createSelector(
  (state) => state.authentication.isLoading,
  (isLoading) => isLoading
);
const getIsAuthenticated = createSelector(
  (state) => state.authentication.isAuthenticated,
  (isAuthenticated) => isAuthenticated
);
const getHasSubmitted = createSelector(
  (state) => state.authentication.hasSubmitted,
  (hasSubmitted) => hasSubmitted
);
const getHasLoaded = createSelector(
  (state) => state.authentication.hasLoaded,
  (hasLoaded) => hasLoaded
);

export default {
  getIsLoading,
  getIsAuthenticated,
  getHasSubmitted,
  getHasLoaded,
};
