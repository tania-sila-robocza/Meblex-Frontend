import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout as logoutAction } from '../../redux/auth';

const Logout = () => {
  const dispatch = useDispatch();
  const logout = useCallback(() => dispatch(logoutAction()), [dispatch]);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (user) logout();
  }, [logout, user]);

  return (user ? null : <Redirect to="/logowanie" />);
};

export default Logout;
