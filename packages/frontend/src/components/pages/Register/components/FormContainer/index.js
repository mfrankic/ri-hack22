import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button, TextField } from '@material-ui/core';

import { paths } from 'src/constants';

import './index.scss';
import image from 'src/images/logo.png';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const FormContainer = ({ onSubmit }) => {
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

    onSubmit(formValues);
  };

  return (
    <div className="login-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <img src={image} alt="logo" />
        <TextField
          name="name"
          label="Ime"
          type="text"
          value={formValues.name}
          onChange={handleInputChange}
          variant="outlined"
          required
        />
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
          Registracija
        </Button>
      </form>
      <div>
        <span>
          Imate račun? <Link to={paths.LOGIN}>Prijavite se</Link>
        </span>
      </div>
    </div>
  );
};

FormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default memo(FormContainer);
