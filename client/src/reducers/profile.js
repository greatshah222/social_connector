import {
  PROFILE_INIT,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  PROFILE_CLEAR,
  ALL_PROFILES_SUCCESS,
  ALL_PROFILES_FAIL,
  GITHUB_REPOS_FAIL,
  GITHUB_REPOS_SUCCESS,
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

    /// all profile
    case ALL_PROFILES_SUCCESS:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case ALL_PROFILES_FAIL:
      return {
        ...state,
        profiles: [],
        loading: false,
      };
    // GITHUB INFO
    case GITHUB_REPOS_SUCCESS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    case GITHUB_REPOS_FAIL:
      return {
        ...state,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
};
export default reducer;
