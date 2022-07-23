import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Drawer } from '..';

const Page = ({ children }) => {
  return (
    <div>
      <Drawer />
      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

Page.defaultProps = {};

export default memo(Page);
