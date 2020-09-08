import axios from 'axios';
import { setAlert } from './alert';
import {
  SIGNUP_SUCCESS,
  SIGNUP_INIT,
  SIGNUP_FAIL,
} from '../reducers/actionTypes';

export const signupUser = (name, email, password, passwordConfirm) => {
  return async (dispatch) => {
    try {
      const data = { name, email, password, passwordConfirm };
      dispatch({
        type: SIGNUP_INIT,
      });

      const res = await axios.post('users/signup', data, {
        withCredentials: true,
      });
      console.log(res.data.token);
      console.log(res.data.data.user);
      dispatch({
        type: SIGNUP_SUCCESS,
        token: res.data.token,
        user: res.data.data.user,
      });
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg)));
      }
      dispatch({
        type: SIGNUP_FAIL,
      });
    }
  };
};
