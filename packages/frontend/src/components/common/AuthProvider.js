import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { actions, selectors } from 'src/store';

import { PageLoader } from 'src/components/common';

import { jwt } from 'src/utils';

const AuthProvider = ({
  authenticateUser,
  children,
  hasLoaded,
  isAuthenticated,
}) => {
  useEffect(() => {
    if (!isAuthenticated) {
      authenticateUser(jwt.getToken());
    }
  }, [authenticateUser, isAuthenticated]);

  if (!hasLoaded && !isAuthenticated) {
    return <PageLoader />;
  }

  return children;
};

AuthProvider.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  hasLoaded: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  hasLoaded: selectors.authentication.getHasLoaded(state),
  isAuthenticated: selectors.authentication.getIsAuthenticated(state),
});

const mapDispatchToProps = {
  ...actions.authentication,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  memo
)(AuthProvider);
