import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import { Button, TextField } from '@material-ui/core';
import image from 'src/images/logo.png';

import { paths } from 'src/constants';

import './index.scss';

const initialValues = {
  email: '',
  password: '',
};

const FormContainer = ({ login }) => {
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

  const loginUser = (event) => {
    event.preventDefault();

    login(formValues).then(() => history.push(paths.BASE));
  };

  return (
    <div className="login-form-container">
      <form className="register-form" onSubmit={loginUser}>
        <img src={image} alt="logo" />
        <TextField
          name="email"
          label="E-mail"
          type="email"
          value={formValues.email}
          onChange={handleInputChange}
          variant="outlined"
          required
        />
        <TextField
          name="password"
          label="Lozinka"
          type="password"
          value={formValues.password}
          onChange={handleInputChange}
          variant="outlined"
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Prijava
        </Button>
      </form>
      <div>
        <span>
          Nemate račun? <Link to={paths.REGISTER}>Registrirajte se</Link>
        </span>
      </div>
    </div>
  );
};

FormContainer.propTypes = {
  login: PropTypes.func.isRequired,
};

export default memo(FormContainer);
