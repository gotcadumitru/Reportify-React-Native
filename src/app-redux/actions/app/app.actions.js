import * as TYPES from './app.actions-types';

export const setter = value => ({
  type: TYPES.SETTER,
  value,
});

export const signIn = (email, password) => ({
  type: TYPES.SIGN_IN,
  email,
  password,
});

export const signUp = (email, password) => ({
  type: TYPES.SIGN_UP,
  email,
  password,
});

export const resetPassword = email => ({
  type: TYPES.SIGN_UP,
  email,
});
