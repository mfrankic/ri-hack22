import { useState } from 'react';

export default (name, defaultValue = null) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const radioButtonProps = {
    name,
    onChange: handleChange,
  };

  return { selectedValue, radioButtonProps, setSelectedValue };
};
