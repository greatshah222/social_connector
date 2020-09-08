import { SET_ALERT, REMOVE_ALERT } from './actionTypes';

const reducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      // we just save the alert once caue it is instantly displayed by toast
      return [payload];
    case REMOVE_ALERT:
      return [];
    default:
      return state;
  }
};

export default reducer;
