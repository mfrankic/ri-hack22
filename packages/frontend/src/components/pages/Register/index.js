import PropTypes from 'prop-types';
import React, { memo, useCallback } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { actions, selectors } from 'src/store';
import { useQuery } from 'src/hooks';

import { OverlayLoader } from 'src/components/common';

import { FormContainer } from './components';

import './index.scss';

const Register = ({ register, isLoading }) => {
  const query = useQuery();

  const token = query.get('token');

  const handleSubmit = useCallback(
    (data) => {
      register(data, token);
    },
    [register, token]
  );

  const content = (
    <div className="login-page">
      {isLoading && <OverlayLoader />}
      <FormContainer onSubmit={handleSubmit} />
    </div>
  );

  return content;
};

Register.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  ...actions.authentication,
};

const mapStateToProps = (state) => ({
  isLoading: selectors.authentication.getIsLoading(state),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  memo
)(Register);
