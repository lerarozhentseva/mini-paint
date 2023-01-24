import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./authReducer";
import paintReducer from "./paintReducer";

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  paint: paintReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
