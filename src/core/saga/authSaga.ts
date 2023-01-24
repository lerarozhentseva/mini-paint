import { put, call, takeEvery } from "redux-saga/effects";
import {
  registerUser,
  loginUser,
  logOutUser,
} from "../services/authService";
import { Action as ReduxAction } from "redux";
import {
  registerSuccess,
  registerError,
  loginSuccess,
  loginError,
  logOutSuccess,
  logOutError,
} from "../actions/authActions";
import { AuthActionsTypes } from "../actions/constants";

export interface Action<T> extends ReduxAction<T> {
  payload: any;
}

function* registerSaga(action: Action<AuthActionsTypes>) {
  const { email, password } = action.payload;
  try {
    const respEmail: string = yield call(registerUser, email, password);
    yield put(registerSuccess(respEmail));
  } catch (err) {
    yield put(registerError((err as Error).message || "error"));
  }
}

function* loginSaga(action: Action<AuthActionsTypes>) {
  const { email, password } = action.payload;
  try {
    const respEmail: string = yield call(loginUser, email, password);
    yield put(loginSuccess(respEmail));
  } catch (err) {
    yield put(loginError((err as Error).message || "error"));
  }
}

function* logOutSaga() {
  try {
    yield call(logOutUser);
    yield put(logOutSuccess());
  } catch (err) {
    yield put(logOutError((err as Error).message || "error"));
  }
}

export function* authWatcher(): Generator {
  yield takeEvery(AuthActionsTypes.REGISTER, registerSaga);
  yield takeEvery(AuthActionsTypes.LOGIN, loginSaga);
  yield takeEvery(AuthActionsTypes.LOG_OUT, logOutSaga);
}
