import { put, call, takeEvery } from 'redux-saga/effects';
import { sendPic, getPics } from '../services/paintService';
import { Action } from './authSaga';
import {
  sendPicSuccess,
  sendPicError,
  getAllPicsSuccess,
  getAllPicsError,
} from '../actions/paintActions';
import {PaintActionsTypes} from "../actions/constants";
import { PicObj } from '../interfaces/paintInterface';

function* getPicsSaga() {
  try {
    const arr: Array<PicObj> = yield call(getPics);
    if(arr) {
      yield put(getAllPicsSuccess(arr));
    }
  } catch (err) {
    yield put(getAllPicsError((err as Error).message || 'error'));
  }
}

function* sendPicSaga(action: Action<PaintActionsTypes>) {
  const { picture, user, cb } = action.payload;
  try {
    yield call(sendPic, picture, user, cb);
    yield put(sendPicSuccess());
  } catch (err) {
    yield put(sendPicError((err as Error).message || 'error'));
  }
}

export function* paintWatcher(): Generator {
  yield takeEvery(PaintActionsTypes.SEND_PIC, sendPicSaga);
  yield takeEvery(PaintActionsTypes.GET_ALL_PICS, getPicsSaga);
}
