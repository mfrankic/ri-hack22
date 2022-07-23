const AUTH_TOKEN = 'auth_token';

const setToken = (token) => localStorage.setItem(AUTH_TOKEN, token);

const getToken = () => localStorage.getItem(AUTH_TOKEN);

export default { setToken, getToken };
