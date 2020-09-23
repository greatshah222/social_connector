// add comment
import axios from 'axios';

import {
  FETCH_SINGLE_COMMENT_SUCCESS,
  POST_INIT,
  CHANGE_LOADING,
  ADD_COMMENT_SUCCESS,
  FETCH_SINGLE_COMMENT_FAILED,
} from '../reducers/actionTypes';

import { setAlert } from './alert';
import { REMOVE_COMMENT_SUCCESS } from '../reducers/actionTypes';
export const addNewComment = (formData, postID, commentID) => {
  console.log(formData);
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
      if (postID && commentID) {
        // editing comment
        res = await axios.patch(
          `/api/v1/posts/${postID}/comments/${commentID}`,
          formData,
          headers,
          {
            withCredentials: true,
          }
        );
      } else {
        res = await axios.post(
          `/api/v1/posts/${postID}/comments/`,
          formData,
          headers,
          {
            withCredentials: true,
          }
        );
      }

      console.log(res.data.data.data);
      await dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: res.data.data.data,
        postID,
      });
      await dispatch(setAlert('Comment created Successfully', 'success'));
    } catch (error) {
      const errors = error.response.data.errors;
      await dispatch({ type: CHANGE_LOADING });

      console.log(errors);
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
    }
  };
};

// get single comment
export const getSingleComment = (postID, commentID) => {
  return async (dispatch) => {
    // for changing loading state
    await dispatch({
      type: POST_INIT,
    });
    try {
      const res = await axios.get(
        `/api/v1/posts/${postID}/comments/${commentID}`,

        {
          withCredentials: true,
        }
      );

      console.log(res.data.data.data);
      dispatch({
        type: FETCH_SINGLE_COMMENT_SUCCESS,
        payload: res.data.data.data,
      });
    } catch (error) {
      const errors = error.response.data.errors;
      await dispatch({ type: CHANGE_LOADING });
      dispatch({
        type: FETCH_SINGLE_COMMENT_FAILED,
      });

      console.log(errors);
      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
    }
  };
};

// delete comment
export const deleteSingleComment = (postID, commentID) => {
  return async (dispatch) => {
    // for changing loading state
    await dispatch({
      type: POST_INIT,
    });
    try {
      const res = await axios.delete(
        `/api/v1/posts/${postID}/comments/${commentID}`,

        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch({
        type: REMOVE_COMMENT_SUCCESS,
        id: commentID,
      });
      await dispatch(setAlert('Comment deleted Successfully', 'success'));
    } catch (error) {
      console.log(error);

      const errors = error.response.data.errors;
      await dispatch({ type: CHANGE_LOADING });

      if (errors) {
        errors.forEach((el) => dispatch(setAlert(el.msg, 'error')));
      }
    }
  };
};
