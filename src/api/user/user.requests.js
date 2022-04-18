import axios from 'axios';
import {API_ROUTES} from 'constants/endpoints/endpoints';

export const getAllPostsRequest = async () => {
  return axios.get(API_ROUTES.POSTS).then(response => {
    return response.data;
  });
};
