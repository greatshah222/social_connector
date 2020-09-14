import axios from 'axios';
import { setAlert } from './alert';
import {
  AUTH_SUCCESS,
  AUTH_INIT,
  AUTH_FAIL,
  SET_USER_INIT,
  SET_USER_SUCCESS,
  SET_USER_FAIL,
  LOGOUT,
  PROFILE_CLEAR,
} from '../reducers/actionTypes';
export const fetchUserDataFromCookie = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_USER_INIT,
      });
      const res = await axios.get('/api/v1/users/token', {
        withCredentials: true,
      });
      console.log(res);
      // if there is token we will do sucess but if there is no token we have to do fail to change the loading state from true to false
      if (res.data.data.token && res.data.data.currentUser) {
        dispatch({
          type: SET_USER_SUCCESS,
          token: res.data.data.token,
          user: res.data.data.currentUser,
        });
      } else {
        dispatch({
          type: SET_USER_FAIL,
        });
      }
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
      dispatch({
        type: SET_USER_FAIL,
      });
    }
  };
};
export const signupUser = (name, email, password, passwordConfirm) => {
  return async (dispatch) => {
    try {
      const data = { name, email, password, passwordConfirm };
      dispatch({
        type: AUTH_INIT,
      });

      const res = await axios.post('/api/v1/users/signup', data, {
        withCredentials: true,
      });
      console.log(res.data.token);
      console.log(res.data.data.user);
      dispatch({
        type: AUTH_SUCCESS,
        token: res.data.token,
        user: res.data.data.user,
      });
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
      dispatch({
        type: AUTH_FAIL,
      });
    }
  };
};

// login user
export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const data = { email, password };
      dispatch({
        type: AUTH_INIT,
      });

      const res = await axios.post('/api/v1/users/login', data, {
        withCredentials: true,
      });
      console.log(res);
      dispatch({
        type: AUTH_SUCCESS,
        token: res.data.token,
        user: res.data.data.user,
      });
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
      dispatch({
        type: AUTH_FAIL,
      });
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: AUTH_INIT,
      });
      const res = await axios.get('/api/v1/users/logout', {
        withCredentials: true,
      });
      console.log(res);
      dispatch({
        type: LOGOUT,
      });
      // WHEN WE LOGOUT WE ALSO HAVE TO CLEAR THE PROFILE FROM THE STATE
      dispatch({
        type: PROFILE_CLEAR,
      });
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
    }
  };
};
