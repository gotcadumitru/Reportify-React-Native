import {all} from 'redux-saga/effects';
import {appActionWatcher} from './app/app.sagas';

export default function* rootSaga() {
  yield all([appActionWatcher()]);
}
