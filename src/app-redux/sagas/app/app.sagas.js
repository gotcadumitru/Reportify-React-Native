import {put, takeEvery, call} from 'redux-saga/effects';
import axios from 'axios';
import {API_ROUTES} from 'constants/endpoints/endpoints';
// * Action types
import {UPLOAD_FILES} from 'app-redux/actions/app/app.actions-types';
import {setter} from 'app-redux/actions/app/app.actions';
// * Generators

function* uploadFilesGenerator({data}) {
  console.log(data);
  try {
    const files = data;
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
}
