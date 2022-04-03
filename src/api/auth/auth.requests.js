import axios from 'axios';
import {API_ROUTES} from 'constants/endpoints/endpoints';

export const loginAppRequest = async data => {
  return axios
    .post(API_ROUTES.LOGIN, {
      ...data,
    })
    .then(response => {
      return response.data;
    });
};

export const registerRequest = async data => {
  return axios
    .post(API_ROUTES.REGISTER, {
      ...data,
      name: '',
      surname: '',
      oras: '',
      localitate: '',
      files: [],
    })
    .then(response => {
      return response.data;
    });
};

export const getProfileRequest = async () => {
  return axios.get(API_ROUTES.PROFILE).then(response => {
    return response.data;
  });
};

export const forgotPasswordRequest = async email => {
  return axios.post(API_ROUTES.FORGOT_PASSWORD, {email}).then(response => {
    return response.data;
  });
};
