import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { SafeRouteValidatorProvider } from 'src/context';
import { paths } from 'src/constants';
import { selectors } from 'src/store';

const AuthValidator = ({ isAuthenticated, children }) => {
  const redirect = !isAuthenticated && paths.LOGIN;

  return (
    <SafeRouteValidatorProvider value={redirect}>
      {children}
    </SafeRouteValidatorProvider>
  );
};

AuthValidator.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: selectors.authentication.getIsAuthenticated(state),
});

export default compose(connect(mapStateToProps), withRouter)(AuthValidator);
