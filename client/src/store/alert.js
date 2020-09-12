import { SET_ALERT, REMOVE_ALERT } from '../reducers/actionTypes';

export const setAlert = (msg, alertType) => {
  return async (dispatch) => {
    await dispatch({
      type: SET_ALERT,
      payload: { msg, alertType },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  };
};
