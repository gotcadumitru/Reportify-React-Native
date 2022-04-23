import {put, takeEvery, call} from 'redux-saga/effects';
import axios from 'axios';
import {API_ROUTES} from 'constants/endpoints/endpoints';

import {editUserRequest, getAllPostsRequest, addPostRequest} from 'api/index';

// * Action types
import {
  UPLOAD_FILES,
  EDIT_USER,
  GET_ALL_POSTS,
  ADD_POST,
} from 'app-redux/actions/app/app.actions-types';
import {setter} from 'app-redux/actions/app/app.actions';
import {getStorageData} from 'helpers/storage';

// * Generators

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
      yield put(setter({posts: res.posts}));
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

// * Watcher
export function* appActionWatcher() {
  yield takeEvery(UPLOAD_FILES, uploadFilesGenerator);
  yield takeEvery(EDIT_USER, editUserGenerator);
  yield takeEvery(GET_ALL_POSTS, getAllPostsGenerator);
  yield takeEvery(ADD_POST, addPostGenerator);
}
