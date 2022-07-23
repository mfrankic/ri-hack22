import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';

const SafeRouteContext = React.createContext(false);

const SafeRouteValidatorProvider = ({ children, value }) => {
  const location = useLocation();
  const childRedirect = value === location.pathname ? false : value;

  return (
    <SafeRouteContext.Consumer>
      {(parentRedirect) => (
        <SafeRouteContext.Provider value={parentRedirect || childRedirect}>
          {children}
        </SafeRouteContext.Provider>
      )}
    </SafeRouteContext.Consumer>
  );
};

SafeRouteValidatorProvider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
};

const SafeRouteValidatorConsumer = SafeRouteContext.Consumer;

export { SafeRouteValidatorProvider, SafeRouteValidatorConsumer };
