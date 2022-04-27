import {put, takeEvery, call, select} from 'redux-saga/effects';
import axios from 'axios';
import {API_ROUTES} from 'constants/endpoints/endpoints';
import getUserLocation from 'helpers/getUserLocation';
import {getDistance} from 'geolib';

import {
  editUserRequest,
  getAllPostsRequest,
  addPostRequest,
  editPostRequest,
  categoriesRequest,
  getSinglePostRequest,
} from 'api/index';

// * Action types
import {
  UPLOAD_FILES,
  EDIT_USER,
  GET_ALL_POSTS,
  ADD_POST,
  VOTE_ITEM,
  GET_CATEGORIES,
  FAVORITE_ITEM,
  GET_SINGLE_POST,
} from 'app-redux/actions/app/app.actions-types';
import {setter} from 'app-redux/actions/app/app.actions';
import {getStorageData} from 'helpers/storage';
import {sortByLength, getSortedPosts} from 'helpers/sort';
// * Generators

const getState = state => state.appReducer;

function* editUserGenerator({data, backForward}) {
  try {
    yield put(setter({isLoading: true}));

    const {name, surname, localitate, oras, files, id, profileImage, birthday} =
      data;
    let filesIDs;
    if (files) filesIDs = yield uploadFilesGenerator({files});
    let profileImageID;
    if (profileImage)
      profileImageID = yield uploadFilesGenerator({files: [profileImage]});
    const res = yield call(editUserRequest, {
      name,
      surname,
      localitate,
      oras,
      ...(files && {domiciliuFiles: filesIDs}),
      id,
      ...(profileImage && {profileImage: profileImageID[0]}),
      birthday,
    });
    if (res) {
      yield put(
        setter({
          isSignedIn: true,
          ...(backForward && {
            hasResponse: {
              isResponse: true,
              message: 'Profilul dvs a fost salvat cu succes!',
              type: true,
            },
          }),
        }),
      );
    }
  } catch (error) {
    yield put(
      setter({
        response: {
          isResponse: true,
          message: error.response.data.message,
          type: false,
        },
      }),
    );
  } finally {
    yield put(setter({isLoading: false}));
  }
}

function* uploadFilesGenerator({files}) {
  try {
    const formData = new FormData();
    files.forEach(file => {
      if (file?.name) {
        formData.append('files', {
          uri: file.uri,
          type: file.type,
          name: file.name,
        });
      } else {
        formData.append('files', {
          uri: file.path,
          type: file.mime,
          name: file.filename,
        });
      }
    });
    const res = yield fetch(axios.defaults.baseURL + API_ROUTES.UPLOAD_FILES, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
    const resData = yield res.json();
    let filesIDs = resData.files.map(file => file.idFromDrive);
    return filesIDs;
  } catch (error) {
    yield put(
      setter({
        response: {
          isResponse: true,
          message:
            'Oooops! Something went wrong when uploading, please try again!',
          type: false,
        },
      }),
    );
  }
}

function* getAllPostsGenerator() {
  try {
    const state = yield select(getState);
    const {areFilters, filters} = state;
    yield put(setter({isLoading: true}));
    const format = yield getStorageData('format');
    if (format) {
      yield put(setter({format}));
    }
    const {coords} = yield call(getUserLocation);

    const res = yield call(getAllPostsRequest);
    if (res) {
      const sortedPosts = res.posts
        .sort((a, b) => sortByLength(a, b, 'likes'))
        .map(post => {
          post.distance = Math.ceil(
            getDistance(
              {latitude: coords.latitude, longitude: coords.longitude},
              post.location,
            ) / 1000,
          );
          return post;
        });
      let filteredPosts = getSortedPosts(areFilters, sortedPosts, filters);

      yield put(
        setter({
          posts: sortedPosts,
          filteredPosts,
          userLocation: coords,
        }),
      );
    }
  } catch (e) {
    yield put(
      setter({
        response: {
          isResponse: true,
          message:
            'Oooops! Something went wrong when getting data, please try again!',
          type: false,
        },
      }),
    );
  } finally {
    yield put(setter({isLoading: false}));
  }
}

function* addPostGenerator({data}) {
  try {
    yield put(setter({isLoading: true}));

    const {files} = data;
    let filesIDs = yield uploadFilesGenerator({files});
    const res = yield call(addPostRequest, {
      ...data,
      files: filesIDs,
    });
    if (res) {
      yield put(
        setter({
          isResetPost: true,
          hasResponse: {
            isResponse: true,
            message: 'Raportul a fost creat cu success!',
            type: true,
          },
        }),
      );
    }
  } catch (error) {
    yield put(
      setter({
        response: {
          isResponse: true,
          message: error.response.data.message,
          type: false,
        },
      }),
    );
  } finally {
    yield put(setter({isLoading: false}));
  }
}

function* voteItemGenerator({index, field}) {
  try {
    const state = yield select(getState);
    const {posts, profile, filters, areFilters} = state;
    const fieldToExclude = field !== 'likes' ? 'likes' : 'disLikes';

    const arrToUpdate = posts[index][field];
    const arrToRemove = posts[index][fieldToExclude];
    const includesInArray = arrToUpdate.includes(profile.id);

    let addedItems;
    if (includesInArray) {
      addedItems = arrToUpdate.filter(id => profile.id !== id);
    } else {
      addedItems = [...arrToUpdate, profile.id];
    }
    let removedItems = arrToRemove.filter(id => profile.id !== id);

    let newPosts = [...posts];
    newPosts[index][field] = addedItems;
    newPosts[index][fieldToExclude] = removedItems;

    let filteredPosts = getSortedPosts(areFilters, newPosts, filters);

    yield put(setter({posts: newPosts, filteredPosts}));
    const res = yield editPostGenerator({
      data: {[field]: addedItems, [fieldToExclude]: removedItems},
      id: newPosts[index]._id,
    });
  } catch (e) {}
}

function* favoriteItemGenerator({index}) {
  try {
    const state = yield select(getState);
    const {posts, profile, currentItem, areFilters, filters} = state;
    const arrToUpdate = posts[index].favorites;

    const includes = arrToUpdate.includes(profile.id);

    let addedItems;
    if (includes) {
      addedItems = arrToUpdate.filter(id => profile.id !== id);
    } else {
      addedItems = [...arrToUpdate, profile.id];
    }

    let newPosts = [...posts];
    newPosts[index].favorites = addedItems;

    filteredPosts = getSortedPosts(areFilters, newPosts, filters);

    yield put(setter({posts: newPosts, filteredPosts}));
    const res = yield editPostGenerator({
      data: {favorites: addedItems},
      id: newPosts[index]._id,
    });
  } catch (error) {}
}

function* editPostGenerator({data, id}) {
  try {
    const res = yield call(editPostRequest, {...data}, id);
    return res;
  } catch (error) {}
}

function* getCategoriesGenerator() {
  try {
    const res = yield call(categoriesRequest);
    if (res) {
      yield put(setter({categories: res.categories}));
    }
  } catch (error) {}
}

function* getSinglePostGenerator({id}) {
  try {
    const state = yield select(getState);
    const {currentPost} = state;
    const res = yield call(getSinglePostRequest, id);
    if (res) {
      yield put(setter({currentPost: {...currentPost, ...res.post}}));
    }
  } catch (error) {}
}

// * Watcher
export function* appActionWatcher() {
  yield takeEvery(UPLOAD_FILES, uploadFilesGenerator);
  yield takeEvery(EDIT_USER, editUserGenerator);
  yield takeEvery(GET_ALL_POSTS, getAllPostsGenerator);
  yield takeEvery(ADD_POST, addPostGenerator);
  yield takeEvery(VOTE_ITEM, voteItemGenerator);
  yield takeEvery(FAVORITE_ITEM, favoriteItemGenerator);
  yield takeEvery(GET_CATEGORIES, getCategoriesGenerator);
  yield takeEvery(GET_SINGLE_POST, getSinglePostGenerator);
}
