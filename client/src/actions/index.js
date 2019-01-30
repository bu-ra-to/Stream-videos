import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from './types';
import history from '../history';
import streams from '../apis/streams';
export const signInaction = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};
export const signOutaction = () => {
  return { type: SIGN_OUT };
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().authReducer;
  const responce = await streams.post('/streams', {
    ...formValues,
    userId,
    Smuser: 'Hello'
  });
  dispatch({ type: CREATE_STREAM, payload: responce.data });
  history.push('/');
};
export const fetchStream = id => async dispatch => {
  const responce = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: responce.data });
};
export const fetchStreams = () => async dispatch => {
  const responce = await streams.get('/streams');
  dispatch({ type: FETCH_STREAMS, payload: responce.data });
};
export const editStream = (id, formValues) => async dispatch => {
  const responce = await streams.patch(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: responce.data });
  history.push('/');
};
export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};
