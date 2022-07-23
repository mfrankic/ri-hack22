import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { paths } from 'src/constants';
import { actions } from 'src/store';

const useLogout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = useCallback(() => {
    localStorage.clear();
    dispatch(actions.authentication.clearUser());
    history.push(paths.LOGIN);
  }, [dispatch, history]);

  return { logout };
};

export default useLogout;
