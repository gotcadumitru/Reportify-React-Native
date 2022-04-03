import {put, takeEvery, call} from 'redux-saga/effects';
import axios from 'axios';
// * Action types
import {
  SIGN_IN,
  SIGN_UP,
  FORGOT_PASSWORD,
} from 'app-redux/actions/app/app.actions-types';
import {setter} from 'app-redux/actions/app/app.actions';

import {
  loginAppRequest,
  registerRequest,
  forgotPasswordRequest,
} from 'api/index';
import {setStorageData} from 'helpers/storage';
// * Generators

function* signInGenerator({email, password}) {
  try {
    const res = yield call(loginAppRequest, {email, password});
    yield setStorageData('token', res.token);
    yield put(setter({isSignedIn: true}));
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.token}`;
  } catch (error) {
    yield put(
      setter({
        response: {isResponse: true, message: error.message, type: false},
      }),
    );
  }
}

function* signUpGenerator({email, password}) {
  try {
    const res = yield call(registerRequest, {email, password});
    console.log(res);
  } catch (error) {
    yield put(
      setter({
        response: {isResponse: true, message: error.message, type: false},
      }),
    );
  }
}

function* forgotPasswordGenerator({email}) {
  try {
    const res = yield call(forgotPasswordRequest, {email});
  } catch (error) {
    yield put(
      setter({
        response: {isResponse: true, message: error.message, type: false},
      }),
    );
  }
}
// * Watcher
export function* authActionWatcher() {
  yield takeEvery(SIGN_IN, signInGenerator);
  yield takeEvery(SIGN_UP, signUpGenerator);
  yield takeEvery(SIGN_UP, signUpGenerator);
  yield takeEvery(FORGOT_PASSWORD, forgotPasswordGenerator);
}
