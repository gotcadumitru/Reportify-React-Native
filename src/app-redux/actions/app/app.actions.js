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
export const signInGoogle = data => ({
  type: TYPES.SIGN_IN_GOOGLE,
  data,
});
export const signInFacebook = data => ({
  type: TYPES.SIGN_IN_FACEBOOK,
  data,
});

export const signUp = (email, password) => ({
  type: TYPES.SIGN_UP,
  email,
  password,
});

export const resetPassword = email => ({
  type: TYPES.FORGOT_PASSWORD,
  email,
});

export const uploadFiles = files => ({
  type: TYPES.UPLOAD_FILES,
  files,
});
export const editUser = (data, backForward) => ({
  type: TYPES.EDIT_USER,
  data,
  backForward,
});

export const getProfile = () => ({
  type: TYPES.GET_PROFILE,
});

export const logout = () => ({
  type: TYPES.LOGOUT,
});

export const getAllPosts = () => ({
  type: TYPES.GET_ALL_POSTS,
});

export const addPost = data => ({
  type: TYPES.ADD_POST,
  data,
});
export const voteItem = (index, field) => ({
  type: TYPES.VOTE_ITEM,
  index,
  field,
});
