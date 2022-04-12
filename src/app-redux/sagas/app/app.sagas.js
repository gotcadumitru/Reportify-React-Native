import {put, takeEvery, call} from 'redux-saga/effects';
import axios from 'axios';
import {API_ROUTES} from 'constants/endpoints/endpoints';

import {editUserRequest} from 'api/index';

// * Action types
import {UPLOAD_FILES, EDIT_USER} from 'app-redux/actions/app/app.actions-types';
import {setter} from 'app-redux/actions/app/app.actions';
// * Generators

function* editUserGenerator({data}) {
  yield put(setter({isLoading: true}));

  try {
    const {name, surname, localitate, oras, files, id, profileImage, birthday} =
      data;
    let filesIDs = yield uploadFilesGenerator({files});
    let profileImageID = [''];
    if (profileImage)
      profileImageID = yield uploadFilesGenerator({files: profileImage});

    const res = yield call(editUserRequest, {
      name,
      surname,
      localitate,
      oras,
      domiciliuFiles: filesIDs,
      id,
      profileImage: profileImageID[0],
      birthday,
    });
    if (res) {
      yield put(setter({isSignedIn: true}));
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

// * Watcher
export function* appActionWatcher() {
  yield takeEvery(UPLOAD_FILES, uploadFilesGenerator);
  yield takeEvery(EDIT_USER, editUserGenerator);
}
