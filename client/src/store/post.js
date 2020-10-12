import axios from 'axios';
import {
  POST_DELETE_SUCCESS,
  POST_INIT,
  POST_SUCCESS,
  UPDATE_LIKE,
  CHANGE_LOADING,
  SINGLE_POST_FETCH_SUCCESS,
  ADD_NEW_POST_SUCCESS,
  ADD_LOCATION_SUCCESS,
} from '../reducers/actionTypes';
import { setAlert } from './alert';

// get posts
export const getAllPosts = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: POST_INIT,
      });
      const res = await axios.get('/api/v1/posts');
      // console.log(res);
      await dispatch({ type: POST_SUCCESS, payload: res.data.data.data });
    } catch (error) {
      const errors = error.response.data.errors;
      // console.log(errors);
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
    }
  };
};
// get posts by post ID
export const getPostByPostId = (ID) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: POST_INIT,
      });
      const res = await axios.get(`/api/v1/posts/${ID}`);
      // console.log(res);
      await dispatch({
        type: SINGLE_POST_FETCH_SUCCESS,
        payload: res.data.data.data,
      });
    } catch (error) {
      const errors = error.response.data.errors;
      await dispatch({ type: CHANGE_LOADING });

      // console.log(errors);
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
    }
  };
};
// add new post
export const addNewPost = (formData, history, ID) => {
  // console.log(formData);
  return async (dispatch) => {
    // for changing loading state
    await dispatch({
      type: POST_INIT,
    });
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      let res;
      if (ID) {
        // TODO THIS ROUTE HAS NOT BEEN HANDLED YET
        res = await axios.patch(`/api/v1/posts/${ID}`, formData, headers, {
          withCredentials: true,
        });
      } else {
        res = await axios.post('/api/v1/posts', formData, headers, {
          withCredentials: true,
        });
      }

      // console.log(res.data.data.data);
      dispatch({
        type: ADD_NEW_POST_SUCCESS,
        payload: res.data.data.data,
      });
      history.push('/posts');
      await dispatch(setAlert('Post created Successfully', 'success'));
    } catch (error) {
      const errors = error.response.data.errors;
      await dispatch({ type: CHANGE_LOADING });

      // console.log(errors);
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
      // here u cannot use same dispatch for profile fail cause if u are editing the profile and there is error it will also delete the old profile details
    }
  };
};
// UPDATE LIKE

export const updateLike = (post_ID) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(`/api/v1/posts/like/${post_ID}`);
      // console.log(res);
      await dispatch({
        type: UPDATE_LIKE,
        payload: res.data.data.data,
        id: post_ID,
      });
    } catch (error) {
      const errors = error.response.data.errors;
      await dispatch({ type: CHANGE_LOADING });

      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
    }
  };
};
// delete single posts
export const deleteSinglePost = (ID) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: POST_INIT,
      });
      await axios.delete(`/api/v1/posts/${ID}`);
      // console.log(res);
      await dispatch({ type: POST_DELETE_SUCCESS, id: ID });
    } catch (error) {
      const errors = error.response.data.errors;
      // console.log(errors);
      await dispatch({ type: CHANGE_LOADING });
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
    }
  };
};

// add new location
export const addNewLocation = (formData, history, ID) => {
  // console.log(formData);
  return async (dispatch) => {
    // for changing loading state
    await dispatch({
      type: POST_INIT,
    });
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      };

      const res = await axios.patch(
        `/api/v1/posts/location/${ID}`,
        formData,
        headers,
        {
          withCredentials: true,
        }
      );

      // console.log(res.data.data.data);
      // we are sending only location to our reducer cause if wee send the whole data we have to populate the comments again
      dispatch({
        type: ADD_LOCATION_SUCCESS,
        payload: res.data.data.data.locations,
        id: res.data.data.data._id,
      });
      history.push('/posts');
      await dispatch(setAlert('Location added Successfully', 'success'));
    } catch (error) {
      const errors = error.response.data.errors;
      await dispatch({ type: CHANGE_LOADING });

      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
    }
  };
};
