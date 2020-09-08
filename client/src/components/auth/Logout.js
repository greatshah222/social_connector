import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/auth';
import { Redirect } from 'react-router-dom';

export const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, []);
  return <Redirect to='/login' />;
};
