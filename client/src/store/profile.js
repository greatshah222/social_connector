import axios from 'axios';
import {
  PROFILE_INIT,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  ALL_PROFILES_FAIL,
  GITHUB_REPOS_FAIL,
  GITHUB_REPOS_SUCCESS,
  ALL_PROFILES_SUCCESS,
} from '../reducers/actionTypes';
import { setAlert } from './alert';
import { logoutUser } from './auth';

// get current user profile

export const getCurrentUserProfile = () => {
  return async (dispatch) => {
    await dispatch({
      type: PROFILE_INIT,
    });
    try {
      const res = await axios.get('/api/v1/profile/me', {
        withCredentials: true,
      });
      // console.log(res.data.data.data);
      dispatch({
        type: PROFILE_SUCCESS,
        payload: res.data.data.data,
      });
    } catch (error) {
      // const errors = error.response.data.errors;
      // console.log(errors);
      // if (errors) {
      //   errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      // }
      dispatch({
        type: PROFILE_FAIL,
      });
    }
  };
};

// get all profiles
export const getAllProfile = () => {
  return async (dispatch) => {
    await dispatch({
      type: PROFILE_INIT,
    });
    try {
      const res = await axios.get('/api/v1/profile', { withCredentials: true });
      // console.log(res.data.data.data);
      dispatch({
        type: ALL_PROFILES_SUCCESS,
        payload: res.data.data.data,
      });
    } catch (error) {
      const errors = error.response.data.errors;
      // console.log(errors);
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
      dispatch({
        type: ALL_PROFILES_FAIL,
      });
    }
  };
};

// get PROFILE BY USER ID
export const getProfileByUserID = (ID) => {
  return async (dispatch) => {
    await dispatch({
      type: PROFILE_INIT,
    });
    try {
      const res = await axios.get(`/api/v1/profile/user/${ID}`, {
        withCredentials: true,
      });
      // console.log(res.data.data.data);
      dispatch({
        type: PROFILE_SUCCESS,
        payload: res.data.data.data,
      });
    } catch (error) {
      const errors = error.response.data.errors;
      // console.log(errors);
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
      dispatch({
        type: PROFILE_FAIL,
      });
    }
  };
};

// GET GITHUB REPOS

export const getGitHubRepos = (GITHUBUSERNAME) => {
  return async (dispatch) => {
    //u cannot use the profile_init cause it will change the loading state to true and every component in profile section will cause infinite rendering
    // await dispatch({
    //   type: PROFILE_INIT,
    // });
    try {
      const res = await axios.get(`/api/v1/profile/github/${GITHUBUSERNAME}`, {
        withCredentials: true,
      });
      // console.log(res.data.data.data);
      dispatch({
        type: GITHUB_REPOS_SUCCESS,
        payload: res.data.data.data,
      });
    } catch (error) {
      const errors = error.response.data.errors;
      // console.log(errors);
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
      dispatch({
        type: GITHUB_REPOS_FAIL,
      });
    }
  };
};

export const createProfile = (formData, history) => {
  // console.log(formData);
  return async (dispatch) => {
    // for changing loading state
    await dispatch({
      type: PROFILE_INIT,
    });
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      };

      const res = await axios.post('/api/v1/profile', formData, headers, {
        withCredentials: true,
      });
      // console.log(res.data.data.data);
      dispatch({
        type: PROFILE_SUCCESS,
        payload: res.data.data.data,
      });
      history.push('/dashboard');
      await dispatch(setAlert('Profile updated Successfully', 'success'));
    } catch (error) {
      const errors = error.response.data.errors;
      // console.log(errors);
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
      // here u cannot use same dispatch for profile fail cause if u are editing the profile and there is error it will also delete the old profile details
    }
  };
};

export const addEducation = (formData, history, ID) => {
  return async (dispatch) => {
    await dispatch({
      type: PROFILE_INIT,
    });

    try {
      let res;
      if (ID) {
        res = await axios.patch(`/api/v1/profile/education/${ID}`, formData, {
          withCredentials: true,
        });
      } else {
        res = await axios.patch('/api/v1/profile/education', formData, {
          withCredentials: true,
        });
      }
      // console.log(res);
      dispatch({
        type: PROFILE_SUCCESS,
        payload: res.data.data.data,
      });
      history.push('/dashboard');
      if (!ID) {
        await dispatch(setAlert('Education added Successfully', 'success'));
      } else {
        await dispatch(setAlert('Education edited Successfully', 'success'));
      }
    } catch (error) {
      // console.log(error);
      const errors = error.response.data.errors;
      // console.log(errors);
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
    }
  };
};
export const deleteEducation = (ID, history) => {
  return async (dispatch) => {
    await dispatch({
      type: PROFILE_INIT,
    });
    try {
      const res = await axios.delete(`/api/v1/profile/education/${ID}`);
      // console.log(res);
      dispatch({
        type: PROFILE_SUCCESS,
        payload: res.data.data.data,
      });
      history.push('/dashboard');
      await dispatch(setAlert('Education deleted Successfully', 'success'));
    } catch (error) {
      const errors = error.response.data.errors;
      // console.log(errors);
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
    }
  };
};

export const addExperience = (formData, history, ID) => {
  // console.log(formData);
  return async (dispatch) => {
    await dispatch({
      type: PROFILE_INIT,
    });
    try {
      let res;
      if (ID) {
        res = await axios.patch(`/api/v1/profile/experience/${ID}`, formData, {
          withCredentials: true,
        });
      } else {
        res = await axios.patch('/api/v1/profile/experience', formData, {
          withCredentials: true,
        });
      }

      // console.log(res);
      dispatch({
        type: PROFILE_SUCCESS,
        payload: res.data.data.data,
      });
      history.push('/dashboard');
      if (!ID) {
        await dispatch(setAlert('Experience added Successfully', 'success'));
      } else {
        await dispatch(setAlert('Experience edited Successfully', 'success'));
      }
    } catch (error) {
      const errors = error.response.data.errors;
      // console.log(errors);
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
    }
  };
};
export const deleteExperience = (ID, history) => {
  return async (dispatch) => {
    await dispatch({
      type: PROFILE_INIT,
    });
    try {
      const res = await axios.delete(`/api/v1/profile/experience/${ID}`);
      // console.log(res);
      dispatch({
        type: PROFILE_SUCCESS,
        payload: res.data.data.data,
      });
      history.push('/dashboard');
      await dispatch(setAlert('Experience deleted Successfully', 'success'));
    } catch (error) {
      const errors = error.response.data.errors;
      // console.log(errors);
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
    }
  };
};

// delete user account

export const deleteAccount = () => {
  return async (dispatch) => {
    try {
      await axios.delete('/api/v1/profile');
      // console.log(res);
      // loggging out user will clear all the state
      await dispatch(logoutUser());
      await dispatch(setAlert('Account Deleted', 'error'));
    } catch (error) {
      const errors = error.response.data.errors;
      // console.log(errors);
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
    }
  };
};
