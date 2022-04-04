const BASE = '/api';
const AUTH = BASE + '/auth';
const POST = BASE + '/post';
const FILES = BASE + '/files';

export const API_ROUTES = {
  REGISTER: AUTH + '/register',
  LOGIN: AUTH + '/login',
  PROFILE: AUTH + '/me',
  GOOGLE_LOGIN: AUTH + '/googlelogin',
  FACEBOOK_LOGIN: AUTH + '/facebooklogin',
  FORGOT_PASSWORD: AUTH + '/forgotpassword',
  EDIT_USER: AUTH + '/edit-user',
};
