import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../reducers/actionTypes';

export const setAlert = (msg) => {
  return async (dispatch) => {
    const id = uuidv4();
    await dispatch({
      type: SET_ALERT,
      payload: { msg, id },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  };
};
