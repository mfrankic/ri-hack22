import { regex } from '../constants';

const getIsMobile = () => {
  const userAgent =
    typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
  if (userAgent.match(regex.devices.tablet)) {
    return false;
  }
  return !!userAgent.match(regex.devices.mobile);
};

export default {
  getIsMobile,
};
