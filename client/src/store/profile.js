import axios from 'axios';
import {
  PROFILE_INIT,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
} from '../reducers/actionTypes';
import { setAlert } from './alert';

// get current user profile

export const getCurrentUserProfile = () => {
  return async (dispatch) => {
    await dispatch({
      type: PROFILE_INIT,
    });
    try {
      const res = await axios.get('profile/me', { withCredentials: true });
      console.log(res.data.data.data);
      dispatch({
        type: PROFILE_SUCCESS,
        payload: res.data.data.data,
      });
    } catch (error) {
      const errors = error.response.data.errors;
      console.log(errors);
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
      dispatch({
        type: PROFILE_FAIL,
      });
    }
  };
};

export const createProfile = (formData, history) => {
  console.log(formData);
  return async (dispatch) => {
    // for changing loading state
    await dispatch({
      type: PROFILE_INIT,
    });
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      };

      const res = await axios.post('profile', formData, headers, {
        withCredentials: true,
      });
      console.log(res.data.data.data);
      dispatch({
        type: PROFILE_SUCCESS,
        payload: res.data.data.data,
      });
      history.push('/dashboard');
      await dispatch(setAlert('Profile updated Successfully', 'success'));
    } catch (error) {
      const errors = error.response.data.errors;
      console.log(errors);
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
      // here u cannot use same dispatch for profile fail cause if u are editing the profile and there is error it will also delete the old profile details
    }
  };
};

export const addEducation = (formData, history) => {
  return async (dispatch) => {
    await dispatch({
      type: PROFILE_INIT,
    });
    try {
      const res = await axios.patch('profile/education', formData, {
        withCredentials: true,
      });
      console.log(res);
      dispatch({
        type: PROFILE_SUCCESS,
        payload: res.data.data.data,
      });
      history.push('/dashboard');
      await dispatch(setAlert('Education added Successfully', 'success'));
    } catch (error) {
      const errors = error.response.data.errors;
      console.log(errors);
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
    }
  };
};
export const addExperience = (formData, history) => {
  return async (dispatch) => {
    await dispatch({
      type: PROFILE_INIT,
    });
    try {
      const res = await axios.patch('profile/experience', formData, {
        withCredentials: true,
      });
      console.log(res);
      dispatch({
        type: PROFILE_SUCCESS,
        payload: res.data.data.data,
      });
      history.push('/dashboard');
      await dispatch(setAlert('Experience added Successfully', 'success'));
    } catch (error) {
      const errors = error.response.data.errors;
      console.log(errors);
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
    }
  };
};
