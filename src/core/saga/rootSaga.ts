import { fork } from 'redux-saga/effects';
import { authWatcher } from './authSaga';
import { paintWatcher } from './paintSaga';

export function* rootSaga(): Generator {
  yield fork(authWatcher);
  yield fork(paintWatcher);
}