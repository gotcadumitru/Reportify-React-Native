const BASE = '/api';
const AUTH = BASE + '/auth';
const POST = BASE + '/post';
const FILES = BASE + '/files';

export const API_ROUTES = {
  REGISTER: AUTH + '/register',
  LOCATION_USERS: AUTH + '/users',
  LOGIN: AUTH + '/login',
  PROFILE: AUTH + '/me',
  GOOGLE_LOGIN: AUTH + '/googlelogin',
  FACEBOOK_LOGIN: AUTH + '/facebooklogin',
  FORGOT_PASSWORD: AUTH + '/forgotpassword',
  EDIT_USER: AUTH + '/edit-user',
  UPLOAD_FILES: FILES + '/upload',
  POSTS: POST,
  COMMENTS: POST + '/comment',
  CATEGORIES: POST + '/categories',
  MESSAGES: BASE + '/message/all/',
};
