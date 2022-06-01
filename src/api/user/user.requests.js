import axios from 'axios';
import {API_ROUTES} from 'constants/endpoints/endpoints';

export const getAllLocationUsersRequest = async ({oras, localitate}) => {
  return axios
    .get(`${API_ROUTES.LOCATION_USERS}/${oras}/${localitate}`)
    .then(response => {
      return response.data;
    });
};
export const getAllPostsRequest = async () => {
  return axios.get(API_ROUTES.POSTS).then(response => {
    return response.data;
  });
};

export const addPostRequest = async data => {
  return axios.post(API_ROUTES.POSTS, {...data}).then(response => {
    return response;
  });
};

export const editPostRequest = async (data, id) => {
  return axios.put(`${API_ROUTES.POSTS}/${id}`, {...data}).then(response => {
    return response;
  });
};

export const getSinglePostRequest = async id => {
  return axios.get(`${API_ROUTES.POSTS}/${id}`).then(response => {
    return response.data;
  });
};

export const categoriesRequest = async () => {
  return axios.get(API_ROUTES.CATEGORIES).then(response => {
    return response.data;
  });
};

export const getAllUserMessagesRequest = async id => {
  return axios.get(API_ROUTES.MESSAGES + id).then(response => {
    return response.data;
  });
};

export const postCommentRequest = async data => {
  return axios.post(API_ROUTES.COMMENTS, {...data}).then(response => {
    return response;
  });
};
