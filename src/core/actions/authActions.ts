import { createAction } from "redux-actions";
import { AuthActionsTypes } from "./constants";

export const register = createAction(AuthActionsTypes.REGISTER);

export const registerSuccess = createAction(
  AuthActionsTypes.REGISTER_SUCCESS,
  (email: string) => ({ email })
);

export const registerError = createAction(
  AuthActionsTypes.REGISTER_ERROR,
  (registerError: string) => ({ registerError })
);

export const login = createAction(AuthActionsTypes.LOGIN);

export const loginSuccess = createAction(
  AuthActionsTypes.LOGIN_SUCCESS,
  (email: string) => ({ email })
);

export const loginError = createAction(
  AuthActionsTypes.LOGIN_ERROR,
  (loginError: string) => ({ loginError })
);

export const logOut = createAction(AuthActionsTypes.LOG_OUT);

export const logOutSuccess = createAction(AuthActionsTypes.LOG_OUT_SUCCESS);

export const logOutError = createAction(
  AuthActionsTypes.LOG_OUT_ERROR,
  (logOutError: string) => ({ logOutError })
);