import PropTypes from 'prop-types';
import React, { memo, useMemo } from 'react';

import classNames from 'classnames';

import './index.scss';

const OverlayLoader = ({ className }) => {
  // @TODO Design it
  const overlayLoaderClassNames = useMemo(
    () => classNames('overlay-loader', className),
    [className]
  );

  return (
    <div className={overlayLoaderClassNames}>
      <div className="overlay-loader__icon" />
    </div>
  );
};

OverlayLoader.propTypes = {
  className: PropTypes.string,
};

OverlayLoader.defaultProps = {
  className: '',
};

export default memo(OverlayLoader);
