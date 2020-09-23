import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import profileReducer from './reducers/profile';
import { composeWithDevTools } from 'redux-devtools-extension';
import alertReducer from './reducers/alert';
import postReducer from './reducers/post';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  alert: alertReducer,
  post: postReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
