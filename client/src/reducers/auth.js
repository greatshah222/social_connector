import { SIGNUP_SUCCESS, SIGNUP_INIT, SIGNUP_FAIL } from './actionTypes';
const initialState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  token: null,
};
const reducer = (state = initialState, action) => {
  const { type, token, user } = action;

  switch (type) {
    case SIGNUP_INIT:
      return { ...state, loading: true };
    case SIGNUP_SUCCESS:
      return { ...state, token, user, isAuthenticated: true, loading: false };
    case SIGNUP_FAIL:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};
export default reducer;
