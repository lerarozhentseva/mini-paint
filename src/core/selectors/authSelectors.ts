import { createSelector } from "reselect";
import { RootState } from "../reducers/rootReducer";

const getAuth = (state: RootState) => state.auth;
export const selectUser = createSelector(getAuth, (auth) => auth.user.email);
export const selectAuthErrors = createSelector(getAuth, (auth) => auth.errors);