import { handleActions } from "redux-actions";
import { AnyAction } from "redux";
import { AuthActionsTypes } from "../actions/constants";

interface InitialState {
  user: {
    email: string;
  };
  errors: {
    registerError: string;
    loginError: string;
    logOutError: string;
  };
}

const initialState: InitialState = {
  user: {
    email: "",
  },
  errors: {
    registerError: "",
    loginError: "",
    logOutError: "",
  },
};

const authReducer = handleActions<InitialState>(
  {
    [AuthActionsTypes.REGISTER]: (state: InitialState) => ({
      ...state,
    }),

    [AuthActionsTypes.REGISTER_SUCCESS]: (
      state: InitialState,
      action: AnyAction
    ) => ({
      ...state,
      user: { ...action.payload },
      errors: { ...initialState.errors },
    }),

    [AuthActionsTypes.REGISTER_ERROR]: (
      state: InitialState,
      action: AnyAction
    ) => ({
      ...state,
      errors: { ...action.payload },
    }),

    [AuthActionsTypes.LOGIN]: (state: InitialState) => ({
      ...state,
    }),

    [AuthActionsTypes.LOGIN_SUCCESS]: (
      state: InitialState,
      action: AnyAction
    ) => ({
      ...state,
      user: { ...action.payload },
      errors: { ...initialState.errors },
    }),

    [AuthActionsTypes.LOGIN_ERROR]: (
      state: InitialState,
      action: AnyAction
    ) => ({ ...state, errors: { ...action.payload } }),

    [AuthActionsTypes.LOG_OUT]: (state: InitialState) => ({
      ...state,
    }),

    [AuthActionsTypes.LOG_OUT_SUCCESS]: () => ({
      ...initialState,
    }),

    [AuthActionsTypes.LOG_OUT_ERROR]: (
      state: InitialState,
      action: AnyAction
    ) => ({ ...state, errors: { ...action.payload } }),
  },
  initialState
);

export default authReducer;