import {
  POST_INIT,
  POST_SUCCESS,
  POST_FAIL,
  UPDATE_LIKE,
  CHANGE_LOADING,
  POST_DELETE_SUCCESS,
  SINGLE_POST_FETCH_SUCCESS,
  ADD_NEW_POST_SUCCESS,
  REMOVE_COMMENT_SUCCESS,
  ADD_COMMENT_SUCCESS,
  FETCH_SINGLE_COMMENT_FAILED,
  FETCH_SINGLE_COMMENT_SUCCESS,
} from './actionTypes';
const initialState = {
  posts: [],
  post: null,
  loading: false,
  // for update and delete of comment we are storing single comment
  comment: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload, id } = action;
  switch (type) {
    case POST_INIT:
      return {
        ...state,
        loading: true,
      };
    case POST_SUCCESS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case POST_DELETE_SUCCESS:
      const updatedPost = state.posts.filter((el) => el._id !== id);
      return {
        ...state,
        posts: updatedPost,
        loading: false,
      };
    case POST_FAIL:
      return {
        ...state,
        posts: [],
        loading: false,
      };
    case CHANGE_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SINGLE_POST_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        post: payload,
      };
    case FETCH_SINGLE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comment: payload,
      };
    case FETCH_SINGLE_COMMENT_FAILED:
      return {
        ...state,
        loading: false,
        comment: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,

        post: { ...state.post, comments: [payload, ...state.post.comments] },
      };
    // edit not completed yet todo
    // case EDIT_COMMENT_SUCCESS:
    //   let comment;
    //   return {
    //     ...state,
    //     loading: false,
    //     post: { ...state.post, comment: [...state.post.comments, payload] },
    //   };
    case REMOVE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments.filter((el) => el._id !== id),
        },
      };

    case ADD_NEW_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, payload],
      };

    case UPDATE_LIKE:
      const updatedPostAfterlike = [...state.posts];
      const singlePost = updatedPostAfterlike.find((el) => el._id === id);
      const index = updatedPostAfterlike.indexOf(singlePost);
      updatedPostAfterlike[index] = payload;

      return {
        ...state,
        posts: updatedPostAfterlike,
      };

    default:
      return state;
  }
};

export default reducer;
