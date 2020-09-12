import {
  PROFILE_INIT,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  PROFILE_CLEAR,
} from './actionTypes';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_INIT:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload,
      };
    case PROFILE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case PROFILE_CLEAR:
      return {
        profile: null,
        profiles: [],
        repos: [],
        loading: false,
      };

    default:
      return state;
  }
};
export default reducer;
