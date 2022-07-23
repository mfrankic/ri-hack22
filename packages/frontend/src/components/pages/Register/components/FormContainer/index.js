import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import { Button, TextField } from '@material-ui/core';

import { paths } from 'src/constants';

import './index.scss';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const FormContainer = ({ onSubmit }) => {
  const history = useHistory();
  const [formValues, setFormValues] = useState(initialValues);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    },
    [formValues]
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(formValues).then(() => history.push(paths.BASE));
  };

  return (
    <>
      <form className="register-form" onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          type="text"
          value={formValues.name}
          onChange={handleInputChange}
          variant="outlined"
          required
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          value={formValues.email}
          onChange={handleInputChange}
          variant="outlined"
          required
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={formValues.password}
          onChange={handleInputChange}
          variant="outlined"
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      <div>
        <span>
          have an account? <Link to={paths.LOGIN}>Login</Link>
        </span>
      </div>
    </>
  );
};

FormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default memo(FormContainer);