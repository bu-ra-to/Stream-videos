import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as formReducer } from 'redux-form';
import streamReducer from './streamReducers';

export default combineReducers({
  authReducer: authReducer,
  form: formReducer,
  streams: streamReducer
});
