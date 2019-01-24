import { SIGN_IN, SIGN_OUT } from './types';
export const signInaction = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};
export const signOutaction = () => {
  return { type: SIGN_OUT };
};
