import React, { memo } from 'react';
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';

import { SafeRouteValidatorConsumer } from 'src/context';

const SafeRoute = ({ component: Component, path, exact }) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => (
        <SafeRouteValidatorConsumer>
          {(redirect) =>
            redirect ? (
              <Redirect to={redirect} />
            ) : (
              <Component {...routeProps} />
            )
          }
        </SafeRouteValidatorConsumer>
      )}
    />
  );
};

SafeRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

SafeRoute.defaultProps = {
  exact: false,
};

export default memo(SafeRoute);
