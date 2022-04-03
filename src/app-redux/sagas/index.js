import {all} from 'redux-saga/effects';
import {appActionWatcher} from './app/app.sagas';
import {authActionWatcher} from './auth/auth.sagas';

export default function* rootSaga() {
  yield all([appActionWatcher(), authActionWatcher()]);
}
