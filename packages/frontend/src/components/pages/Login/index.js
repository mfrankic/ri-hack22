import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { actions, selectors } from 'src/store';
import { useQuery } from 'src/hooks';
import { jwt } from 'src/utils';

import { OverlayLoader } from 'src/components/common';

import { FormContainer } from './components';

import './index.scss';

const Login = ({ login, isLoading }) => {
  const query = useQuery();
  const token = query.get('token');

  if (token) {
    jwt.setToken(token);
    window.location.reload();
  }

  const content = useMemo(
    () => (
      <>
        {isLoading && <OverlayLoader />}
        <FormContainer login={login} />
      </>
    ),
    [isLoading, login]
  );

  return content;
};

Login.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: selectors.authentication.getIsLoading(state),
});

const mapDispatchToProps = {
  ...actions.authentication,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  memo
)(Login);
