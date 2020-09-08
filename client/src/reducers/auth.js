import {
  AUTH_SUCCESS,
  AUTH_INIT,
  AUTH_FAIL,
  SET_USER_INIT,
  SET_USER_SUCCESS,
  SET_USER_FAIL,
  LOGOUT,
} from './actionTypes';
const initialState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  token: null,
};
const reducer = (state = initialState, action) => {
  const { type, token, user } = action;

  switch (type) {
    case AUTH_INIT:
      return { ...state, loading: true };

    // TWO CASE AT THE SAME TIME
    case AUTH_SUCCESS:
    case SET_USER_SUCCESS:
      return { ...state, token, user, isAuthenticated: true, loading: false };
    case AUTH_FAIL:
    case SET_USER_FAIL:
    case LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case SET_USER_INIT:
      return { ...state, loading: true };

    default:
      return state;
  }
};
export default reducer;
