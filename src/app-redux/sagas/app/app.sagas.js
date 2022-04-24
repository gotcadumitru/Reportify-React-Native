import {put, takeEvery, call, select} from 'redux-saga/effects';
import axios from 'axios';
import {API_ROUTES} from 'constants/endpoints/endpoints';

import {
  editUserRequest,
  getAllPostsRequest,
  addPostRequest,
  editPostRequest,
} from 'api/index';

// * Action types
import {
  UPLOAD_FILES,
  EDIT_USER,
  GET_ALL_POSTS,
  ADD_POST,
  LIKE_ITEM,
} from 'app-redux/actions/app/app.actions-types';
import {setter} from 'app-redux/actions/app/app.actions';
import {getStorageData} from 'helpers/storage';
import {sortByDate} from 'helpers/sort';
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
    yield put(setter({isLoading: true}));
    const format = yield getStorageData('format');
    if (format) {
      yield put(setter({format}));
    }
    const res = yield call(getAllPostsRequest);
    if (res) {
      yield put(setter({posts: res.posts.sort(sortByDate)}));
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

function* likeItemGenerator({index}) {
  try {
    const state = yield select(getState);
    const {posts, profile} = state;
    const likedArr = posts[index].likes;
    const isLiked = likedArr.includes(profile.id);
    let likes;
    if (isLiked) {
      likes = likedArr.filter(id => profile.id !== id);
    } else {
      likes = [...likedArr, profile.id];
    }
    let newPosts = [...posts];
    newPosts[index].likes = likes;
    const res = yield editPostGenerator({
      data: {likes},
      id: newPosts[index]._id,
    });
    if (res) {
      yield put(setter({posts: newPosts}));
    }
  } catch (e) {
    console.log(e);
  }
}

function* editPostGenerator({data, id}) {
  try {
    const res = yield call(editPostRequest, {...data}, id);
    return res;
  } catch (error) {}
}

// * Watcher
export function* appActionWatcher() {
  yield takeEvery(UPLOAD_FILES, uploadFilesGenerator);
  yield takeEvery(EDIT_USER, editUserGenerator);
  yield takeEvery(GET_ALL_POSTS, getAllPostsGenerator);
  yield takeEvery(ADD_POST, addPostGenerator);
  yield takeEvery(LIKE_ITEM, likeItemGenerator);
}
