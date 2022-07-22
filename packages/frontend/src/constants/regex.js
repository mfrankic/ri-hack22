export default {
  // at least 1 upper, 1 lower case letter, 1 number and contain given special characters
  password: /^.*(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!&$%?"]).*$/,
  emptyString: /^$/,
  devices: {
    tablet: /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i,
    mobile: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/,
  },
  extractEmail: /[a-zA-Z0-9+._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
};
