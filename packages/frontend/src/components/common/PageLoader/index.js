import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { OverlayLoader } from '..';

import './index.scss';

const PageLoader = ({ children }) => {
  return (
    <>
      {children}
      <OverlayLoader />
    </>
  );
};

PageLoader.propTypes = {
  children: PropTypes.node,
};

PageLoader.defaultProps = {
  children: null,
};

export default memo(PageLoader);
